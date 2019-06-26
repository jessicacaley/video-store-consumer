import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';

const Search = props => {
  return (
    <section className="seach">
      <p>props.searchTerm</p>
    </section>
  );
};

Search.propTypes = {
  searchTerm: PropTypes.string
};

export default Search;
