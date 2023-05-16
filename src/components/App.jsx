import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Searchbar  from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery'
import { FetchImages } from '../FetchSaerch/fetchSaerch'
import { Button } from './Button/Button'
import { Loader } from './Loader/Loader'
import {StyledApp} from 'components/App.styled'


export class App extends Component {
  state ={ 
    images: [],
    status: 'idle',
    imagesName: '',
    page: 1,
    totalImages: 0,
    notification: { type: '', message: '' }
  }

  componentDidUpdate(_, prevState) {
    const { imagesName, page, notification } = this.state;
    const { addImages, handleNotification } = this;

    if (prevState.imagesName !== imagesName || prevState.page !== page) {
      addImages();
    }

    if (prevState.error !== notification && notification) {
      handleNotification();
    }
  }


  addImages = async () => {
    const { imagesName, page } = this.state;

    this.setState({ status: 'pending' });

    try {
      const { images, totalImages } = await FetchImages(imagesName, page);

      if (images.length === 0) {
        this.setState({
          notification: {
            type: 'error',
            message:
              'Sorry, there are no images matching your search query. Please try again.',
          },
        });
      }
      if (images.length !== 0 && page === 1) {
        this.setState({
          notification: {
            type: 'success',
            message: `Hooray! We found ${totalImages} images.`,
          },
        });
      }

      if (
        totalImages > 0 &&
        page !== 1 &&
        totalImages <= this.state.images.length + 12
      ) {
        this.setState({
          notification: {
            type: 'info',
            message: 'You have reached the end of search results.',
          },
        });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        status: 'resolved',
        totalImages,
      }));
    } catch (error) {
      console.log(error.message);
      this.setState({
        notification: {
          type: 'error',
          message: 'There are some problems! Try again later.',
        },
        status: 'rejected',
      });
    }
  };


  handleSearch = imagesName => {
    if (!imagesName) {
      this.setState({
        notification: {
          type: 'info',
          message: 'Please enter your search query!',
        },
      });
      return;
    }

    if (imagesName === this.state.imagesName) {
      this.setState({
        notification: {
          type: 'info',
          message:
            'You are seeing the images by this query. Please, change your query.',
        },
      });
      return;
    }

    this.setState({
      imagesName: imagesName,
      images: [],
      page: 1,
      notification: {
        type: '',
        message: '',
      },
      status: 'idle',
    });
  };


  handleNotification = () => {
    const notificationType = this.state.notification.type;
    const notificationMessage = this.state.notification.message;

    if (notificationType === 'info') {
      toast.info(notificationMessage);
      this.setState({
        notification: { type: '', message: '' },
      });
    }
    if (notificationType === 'error') {
      toast.error(notificationMessage);
      this.setState({
        notification: { type: '', message: '' },
      });
    }
    if (notificationType === 'success') {
      toast.success(notificationMessage);
      this.setState({
        notification: { type: '', message: '' },
      });
    }
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };


render () {
  const { status, images, totalImages, page} = this.state;
  const { onLoadMore} = this;

  return (
  <StyledApp>
    <Searchbar formSubmit={this.handleSearch}/>
    {status === 'pending' && <Loader />}
    {(status === 'resolved' || (status === 'pending' && page !== 1)) && (
     <ImageGallery images={images} />
    )}

    {((totalImages !== images.length && status === 'resolved') || (status === 'pending' && page > 1)) && (
    <Button onClick = {onLoadMore} />
    )}

    <ToastContainer autoClose ={3000}/>
  </StyledApp>
  )
}
}
