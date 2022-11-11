import axios from 'axios';
import Notiflix from 'notiflix';

export async function fetchImages(searchQuerry, page = 1, perPage = 40) {
  try {
    const images = await axios.get(
      `https://pixabay.com/api/?key=31256159-3583445ba8aedc93c288b75a9&q=${searchQuerry}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return images.data;
  } catch (error) {
    if (images.data.length === 0) {
      Notiflix.Notify.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.error('An Error has occured: ', error);
    }
  }
}
