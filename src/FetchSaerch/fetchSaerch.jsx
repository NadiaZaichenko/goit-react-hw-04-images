import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const API_KEY = '34679594-d1431b462dfbe95ceee8bf0ed';

export const FetchImages = async (imagesName, page) => {
  const response = await axios.get(
    `${BASE_URL}/api/?q=${imagesName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  const images = response.data.hits.map(
    ({ id, webformatURL, largeImageURL, tags }) => {
      return {
        id,
        webformatURL,
        largeImageURL,
        tags,
      };
    }
  );
  return { images, totalImages: response.data.totalHits };
};