import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from './ImageGallery/ImageGallery'
import { FetchImages } from '../FetchSaerch/fetchSaerch'
import { Button } from './Button/Button'
import { Loader } from './Loader/Loader'
import {StyledApp} from 'components/App.styled'


export const App = () => {
 const [images, setImages] = useState([]);
 const [status, setStatus] = useState('idle');
 const [query, setQuery] = useState('');
 const [page, setPage] = useState(1);
 const [total, setTotal] = useState(0);
 const [notification, setNotification] = useState({type: '', message: ''});


 useEffect(() => {
   if(!query) {
    return;
   }

async function addImages() {
    setStatus('pending' );

    try {
      const { images, total } = await FetchImages(query, page);

      if (images.length === 0) {
        setNotification({
            type: 'error',
            message:
              'Sorry, there are no images matching your search query. Please try again.',
          },
        );
      }
      if (images.length !== 0 && page === 1) {
       setNotification({
            type: 'success',
            message: `Hooray! We found ${total} images.`,
          });
      }

      if (
        total > 0 &&
        page !== 1 &&
        total <= images.length + 12
      ) {
        setNotification({
            type: 'info',
            message: 'You have reached the end of search results.',
          });
      }

      setImages(prevState => [...prevState, ...images]);
      setStatus('resolved');
      setTotal(total);
    } catch (error) {
      console.log(error.message);
      setNotification({
          type: 'error',
          message: 'There are some problems! Try again later.',
        })
        setStatus('rejected');
    }
  };
 addImages();
 }, [query, page]);


  const handleSearch = imagesName => {
    if (!imagesName) {
      setNotification( {
          type: 'info',
          message: 'Please enter your search query!',
        });
      return;
    }

    if (imagesName === query) {
      setNotification({
          type: 'info',
          message:
            'You are seeing the images by this query. Please, change your query.',
        });
      return;
    }
    setQuery(imagesName);
    setImages([]);
    setPage(1);
    setNotification({type: '', message: ''});
    setStatus('idle');
  };

  useEffect(() => {
    if(notification) {
     function handleNotification() {
    const notificationType = notification.type;
    const notificationMessage = notification.message;

    if (notificationType === 'info') {
      toast.info(notificationMessage);
     setNotification({ type: '', message: '' });
    }
    if (notificationType === 'error') {
      toast.error(notificationMessage);
      setNotification({ type: '', message: '' });
    }
    if (notificationType === 'success') {
      toast.success(notificationMessage);
      setNotification( { type: '', message: '' });
    }
  };
   handleNotification();
 }
}, [notification]);

  

 const onLoadMore = () => {
    setPage(page + 1);
  };

  return (
  <StyledApp>
    <Searchbar formSubmit={handleSearch}/>
    {status === 'pending' && <Loader />}
    {(status === 'resolved' || (status === 'pending' && page !== 1)) && (
     <ImageGallery images={images} />
    )}

    {((total !== images.length && status === 'resolved') || (status === 'pending' && page > 1)) && (
    <Button onClick = {onLoadMore} />
    )}

    <ToastContainer autoClose ={3000}/>
  </StyledApp>
  )
}
