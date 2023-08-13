import { useEffect, useCallback } from 'react';
import { ModalPhotoOverlay, ModalPhotoWindow, ModalPhotoBigImage } from './modalPhoto.styled';
import PropTypes from 'prop-types';

export default function ModalPhoto({ largeImageURL, toggleModal }) {
  // close modal by ESC
  const closeModalEsc = useCallback(
    event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', closeModalEsc);

    return () => {
      window.removeEventListener('keydown', closeModalEsc);
    };
  }, [closeModalEsc]);

  return (
    <ModalPhotoOverlay
      onClick={event => {
        if (event.target === event.currentTarget) {
          toggleModal();
        }
      }}
    >
      <ModalPhotoWindow>
        <ModalPhotoBigImage src={largeImageURL} alt="photo"></ModalPhotoBigImage>
      </ModalPhotoWindow>
    </ModalPhotoOverlay>
  );
}

ModalPhoto.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
