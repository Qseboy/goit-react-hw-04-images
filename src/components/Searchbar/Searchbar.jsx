import { useState } from 'react';
import {
  SearchbarButton,
  SearchbarForm,
  SearchbarHeader,
  SearchbarInput,
  SearchbarSpan,
} from './searchbar.styled';
import PropTypes from 'prop-types';

export default function Searchbar({ submitForm }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (searchValue.trim() === '') {
      alert('Input name of pictures');
      return;
    }

    submitForm(searchValue);
    setSearchValue('');
  };

  return (
    <>
      <SearchbarHeader>
        <SearchbarForm onSubmit={handleSubmit}>
          <SearchbarButton type="submit">
            <SearchbarSpan>Search</SearchbarSpan>
          </SearchbarButton>
          <SearchbarInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={event => setSearchValue(event.target.value.toLowerCase())}
          ></SearchbarInput>
        </SearchbarForm>
      </SearchbarHeader>
    </>
  );
}

Searchbar.propTypes = {
  submitForm: PropTypes.func.isRequired,
};
