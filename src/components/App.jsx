import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import SearchApi from 'service/Api';
import Container from './Container';
import ImageList from './ImageList';
import Loader from './Loader';
import LoadMoreBtn from './LoadMoreBtn';
import ModalLargeImg from './Modal';
import SearchBar from './SearchBar';



export class App extends Component {
  state = {
    images: [],
    largeImage: null,
    page: 1,
    value: "",
    loading: false,
    showModal: false,
    error: null,
  }
  componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    const options = { value, page };

    if (prevState.value !== value) {
      this.setState(() => ({ loading: true, images: [], error: null }));

      SearchApi(options).then((images) => {
        if (images.hits.length === 0) {
          this.setState((error) => ({ error }));
        }
        this.setState({ images: images.hits });
      })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevState.page !== page && page !== 1) {
      this.setState(() => ({ loading: true }));

      SearchApi(options)
        .then((images) =>
          this.setState({
            images: [...prevState.images, ...images.hits],
          })
        )
        .finally(() => this.setState({ loading: false }));
    }
  }
  handleSubmit = (value) => {
    this.setState({
      value: value,
      page: 1
    })
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onClose = (e) => {
    if (e.target === e.currentTarget || e.code === "Escape") {
      this.toggleModal();
    }
  };

  handleClickImage = (largeImage) => {
    this.toggleModal();
    this.setState({ largeImage });
  };


  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {

    const { images, loading, showModal, largeImage, value } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit} />
        {loading && <Loader />}
        {images && <ImageList images={images} largeImage={this.handleClickImage} value={value} />}
        {images.length !== 0 &&
          (loading ? <Loader /> : <LoadMoreBtn onClick={this.handleLoadMore} />)}
        {showModal && <ModalLargeImg onClose={this.onClose}>{largeImage}</ModalLargeImg>}
        <ToastContainer autoClose={3000} />
      </Container>
    )
  }
}
