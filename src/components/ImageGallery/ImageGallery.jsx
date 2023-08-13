import { ImageGalleryList } from './imageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMore from 'components/LoadMore/LoadMore';
import PropTypes from 'prop-types';

export default function ImageGallery({ photos, incrementPage, loadMoreButton, handleOpenModal }) {
  return (
    <>
      {photos.length > 0 && (
        <ImageGalleryList>
          {photos &&
            photos.map(el => (
              <ImageGalleryItem
                key={el.id}
                webformatURL={el.webformatURL}
                largeImageURL={el.largeImageURL}
                handleOpenModal={handleOpenModal}
              ></ImageGalleryItem>
            ))}
        </ImageGalleryList>
      )}
      {loadMoreButton && <LoadMore incrementPage={incrementPage} />}
    </>
  );
}

ImageGallery.propTypes = {
  incrementPage: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  loadMoreButton: PropTypes.bool.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
