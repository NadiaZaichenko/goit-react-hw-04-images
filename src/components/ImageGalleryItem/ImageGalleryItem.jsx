import { GalleryItem, GalleryImage} from './ImageGalleryItem.styled'
import { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'components/Modal/Modal'

export class ImageGalleryItem extends Component {
state ={
    showModal: false,
    largeImageURL : this.props.largeImageURL
}

toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal}))
}

render() {
    const {toggleModal} = this;
    const {showModal, largeImageURL} = this.state;
    const {webformatURL, tags} = this.props;
    return (<>
       <GalleryItem onClick ={toggleModal}>
       <GalleryImage src={webformatURL} alt={tags} />
     </GalleryItem>
     {showModal && (<Modal onClose = {toggleModal} large={largeImageURL} alt={tags} />)}
    </>
     
    )
}
} 
ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  };
