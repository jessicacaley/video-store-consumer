import React from 'react';
import PropTypes from 'prop-types';

const Library = (props) => {
  const { movies } = props;
  return (
    <section className="library">
      <h3>{ movies.first }</h3>
    </section>
  );
};

Customer.propTypes = {
  movies: PropTypes.array.isRequired,
  // add others if necessary
};

export default Library;