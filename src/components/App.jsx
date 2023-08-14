import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import ModalPhoto from './ModalPhoto/ModalPhoto';
import { getPhotos, handleApiData } from 'services/pixibay-api';
import Loader from 'components/Loader/Loader';
import { toast } from 'react-toastify';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMoreButton, setLoadMoreButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    // set loader
    setLoader(true);

    // fetch
    getPhotos(searchValue, page)
      .then(data => {
        const { totalHits, hits } = data;
        const formatData = handleApiData(hits);

        if (page === 1) {
          toast.success(`Was find ${totalHits} images`);
        }

        // check loadMoreButton
        setLoadMoreButton(page < Math.ceil(totalHits / 12));

        // check if API find no Images[]
        if (!totalHits) {
          toast.warn(`Not found images by this name - ${searchValue}`);
          return;
        }

        // set photos
        setPhotos(prevPhotos => [...prevPhotos, ...formatData]);
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [searchValue, page]);

  // load more button
  const incrementPage = () => {
    setPage(page + 1);
  };

  // close \ open modal
  const toggleModal = () => {
    setIsPhotoModalOpen(!isPhotoModalOpen);
  };

  const handleSubmit = searchValue => {
    setSearchValue(searchValue);
    setPhotos([]);
    setPage(1);
  };

  const handleOpenModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setIsPhotoModalOpen(true);
  };

  return (
    <>
      <Searchbar submitForm={handleSubmit} />
      {loader && <Loader />}
      <ImageGallery
        photos={photos}
        incrementPage={incrementPage}
        loadMoreButton={loadMoreButton}
        handleOpenModal={handleOpenModal}
      />

      {isPhotoModalOpen && <ModalPhoto largeImageURL={largeImageURL} toggleModal={toggleModal} />}
    </>
  );
}
