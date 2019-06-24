import React from 'react';
import PropTypes from 'prop-types';

Movie.propTypes = {
  id: PropTypes.number,
  external_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  image_url: PropTypes.string.isRequired,
  movies: PropTypes.array
  // getMovie: PropTypes.func,
};
// also in the api is created/updated at and inventory
