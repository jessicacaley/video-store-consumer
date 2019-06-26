import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie'
import './Library.css'

const Library = (props) => {
  const { movies, selectMovieCallback, existingMovieIds, selectedMovie } = props;

  const movieComponents = movies.map(movie => {
    return (
      <Movie 
        key={ movie.id } 
        id={ movie.id }
        external_id={ movie.external_id }
        title={ movie.title }
        overview={ movie.overview }
        release_date={ movie.release_date }
        image_url={movie.image_url}
        selectMovieCallback={ selectMovieCallback }
        existingMovieIds={ existingMovieIds }
        selectedMovie={ selectedMovie } />
    )
  });

  return (
    <div className="library">
      {movieComponents}
    </div>
  );
};

Library.propTypes = {
  movies: PropTypes.array.isRequired,
  // add others if necessary
};

export default Library;