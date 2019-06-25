import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

const Movie = (props) => {
  const { id, external_id, title, overview, release_date, image_url } = props;

  let cssShowOrHide = "movieShow";

  const cssShow = () => {
    cssShowOrHide = "movieShow";
  }

  const cssHide = () => {
    cssShowOrHide = "movieHide";
  }

  return (
    <section className="movie">
      <h3>{ title }</h3>
      <h4>{ id }</h4>
      <p>{ external_id }</p>
      <p>{ overview }</p>
      <p>{ release_date }</p>
      <img onMouseEnter={ cssHide } onMouseLeave={ cssShow } className={ cssShowOrHide } src={ image_url } />
    </section>
  );
};

Movie.propTypes = {
  id: PropTypes.number,
  external_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  image_url: PropTypes.string.isRequired,
  // movies: PropTypes.array
  // getMovie: PropTypes.func,
};
// also in the api is created/updated at and inventory

export default Movie;