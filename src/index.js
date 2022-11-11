import Notiflix from 'notiflix';
import { fetchImages } from './js/fetchImages';

const searchQuerry = document.querySelector('input[name="searchQuery"]');
const searchForm = document.querySelector('#search-bar');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const perPage = 40;
loadMoreBtn.style.display = 'none';

async function submitHandler(event) {
  event.preventDefault();
  clearGallery();
  fetchImages(searchQuerry.value, page, 40)
    .then(result => {
      let noOfPages = result.totalHits / perPage;

      if (result.hits.length > 0) {
        renderGallery(result);
        if (page < noOfPages) {
          loadMoreBtn.style.display = 'block';
        } else {
          loadMoreBtn.style.display = 'none';
        }
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        clearGallery();
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('An Error has Occured: ', error);
    });
}

searchForm.addEventListener('submit', submitHandler);

function clearGallery() {
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  page = 1;
}

function renderGallery(result) {
  const layout = result.hits
    .map(res => {
      return `<div class="card">
        <img class="card__image" src="${res.webformatURL}" alt="${
        res.tag
      }" loading="lazy" width="300"/>
        <div class="card__info">
            <p class="card__info-item"> Likes </p>
            <p class="card__info-number">${res.likes.toLocaleString()}</p>
        </div>
        <div class="card__info">
            <p class="card__info-item"> Views </p>
            <p class="card__info-number">${res.views.toLocaleString()}</p>
        </div>
        <div class="card__info">
            <p class="card__info-item"> Comments </p>
            <p class="card__info-number">${res.comments.toLocaleString()}</p>
        </div>
        <div class="card__info">
            <p class="card__info-item"> Downloads </p>
            <p class="card__info-number">${res.downloads.toLocaleString()}</p>
        </div>
        </div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', layout);
}

loadMoreBtn.addEventListener('click', () => {
  page += 1;
  fetchImages(searchQuerry.value, page, perPage).then(result => {
    let totalPages = result.totalHits / perPage;

    renderGallery(result);
    if (page >= totalPages) {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info('No More Results To Display');
    }
  });
});
