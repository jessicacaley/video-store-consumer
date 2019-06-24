import React from 'react';
import PropTypes from 'prop-types';

const Library = (props) => {
  const { movies } = props;

  // const onClicked = () => {
  //   props.getThing(id, name);
  // };

  return (
    <section className="library">
      <h3>{ movies.first }</h3>
      {/* <div className="select_this_thing">
        <button className="select_thing_button" onClick={onClicked}>
          Select Thing
        </button>
      </div> */}
    </section>
  );
};

Customer.propTypes = {
  movies: PropTypes.array.isRequired,
  // add others if necessary
};

export default Library;