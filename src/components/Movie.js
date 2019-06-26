import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      selected: false,
    };
  }

  clickMovie = () => {
    this.setState({ selected: !this.state.selected })
  }

  clickAdd = () => {
    // if our library already includes it
      // make it the current selection
      console.log(this.props)
      this.props.selectMovieCallback(this.props);
    // else
      // add it to the library
    // end
  }

  render() {
    return (
      <div onClick={ this.clickMovie } className={`moviecard ${this.state.selected ? "selected" : "not-selected"}`}>
        <div className="moviecard__inner">
          <div className="moviecard__front">
            <img className="image" src={ this.props.image_url } alt="Movie"/>
          </div>
          <div className="moviecard__back">
            <p className="movie-title">{ this.props.title } { this.props.release_date ? `(${this.props.release_date.substring(0,4)})`  : "" }  </p>
            <p className="movie-info">{ this.props.overview }</p> 
            <button className="movie-button btn btn-secondary" onClick={this.clickAdd}>+</button>
          </div>
        </div>
      </div>
    );
  }
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