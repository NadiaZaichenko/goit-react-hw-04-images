import PropTypes from 'prop-types'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import { GalleryList } from './ImageGallery.styled'

export const ImageGallery =({images})=> {
return (
  <GalleryList>
    {images && images.map(({id, webformatURL, largeImageURL, tags})=> 
      <ImageGalleryItem
      key= {id} 
      webformatURL={webformatURL} 
      tags ={tags}
      largeImageURL={largeImageURL}
      />)}
  </GalleryList>
)
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};