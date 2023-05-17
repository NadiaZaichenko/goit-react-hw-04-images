import { GalleryItem, GalleryImage} from './ImageGalleryItem.styled'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'components/Modal/Modal'

export const ImageGalleryItem = ({largeImageURL, webformatURL, tags }) => {
const [show, setShow] = useState(false);


const toggleModal = () => {
   setShow(prevState => !prevState);
}
    return (<>
       <GalleryItem onClick ={toggleModal}>
       <GalleryImage src={webformatURL} alt={tags} />
     </GalleryItem>
     {show && (<Modal onClose={toggleModal} large={largeImageURL} alt={tags} />)}
    </>
     
    )
}

ImageGalleryItem.propTypes = {
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired
  };
