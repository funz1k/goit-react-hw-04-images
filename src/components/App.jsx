import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchApi from 'service/Api';
import Container from './Container';
import ImageList from './ImageList';
import Loader from './Loader';
import LoadMoreBtn from './LoadMoreBtn';
import ModalLargeImg from './Modal';
import SearchBar from './SearchBar';

const App = () => {
  const [images, setImages] = useState([]);
  const [largeImages, setLargeImages] = useState(null);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!value) {
      return
    };

    setLoading(true);

    SearchApi(value, page).then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        toast.error("Please enter something!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / 12));
    })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

    setLoading(true);
  }, [value, page, error])

  const handleSubmit = value => {
    setValue(value);
    setPage(1);
    setImages([]);
    setError(null);
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onClose = (e) => {
    if (e.target === e.currentTarget || e.code === "Escape") {
      toggleModal();
    }
  };

  const handleClickImage = largeImage => {
    toggleModal();
    setLargeImages(largeImage);
  };


  const handleLoadMore = () => {
    setPage(page => page + 1)
  };

  return (
    <Container>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {images && <ImageList images={images} largeImage={handleClickImage} value={value} />}
      {images.length !== 0 &&
        (loadMore && <LoadMoreBtn onClick={handleLoadMore} />)}
      {showModal && <ModalLargeImg onClose={onClose}>{largeImages}</ModalLargeImg>}
      <ToastContainer autoClose={3000} />
    </Container>
  )
}

export default App;
