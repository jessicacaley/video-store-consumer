import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './Movie.css';

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      flipped: false,
      inLibrary: (this.props.existingMovieIds.includes(this.props.external_id)) ? true : false,
    };
  }

  clickMovie = () => {
    this.setState({ flipped: !this.state.flipped })
  }

  clickAdd = () => {
    // if our library already includes it, make it the current selection
    if(this.state.inLibrary) {
      this.props.selectMovieCallback(this.props.external_id);
    } else {
      this.addToLibrary()
    }
  }

  componentDidUpdate(previousProps) {
    if (this.props.existingMovieIds !== previousProps.existingMovieIds) {
      this.setState({ inLibrary: (this.props.existingMovieIds.includes(this.props.external_id)) ? true : false })
    }
  }

  addToLibrary = () => {
    const params = {
      id: this.props.id,
      external_id: this.props.external_id,
      title: this.props.title,
      overview: this.props.overview,
      release_date: this.props.release_date,
      image_url: this.props.image_url
    }
    axios
      .post('http://localhost:3000/movies/', params)
      .then(response => {
        console.log("success!")
        this.props.resetMovies();
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      })
  }

  ribbon = () => {
    if (!this.state.inLibrary) {
      return (
        <div className="ribbon">
          <div className="txt">
            not in library
          </div>
        </div>
      )
    } else {
      return ""
    }
  }

  render() {
    let selected = false;

    if(this.props.selectedMovieExternalId && this.props.selectedMovieExternalId === this.props.external_id) {
      selected = true;
    } else {
      selected = false;
    }

    return (
      <div
        onClick={ this.clickMovie }
        className={`moviecard
                    ${this.state.flipped ? "flipped" : ""}
                    ${selected ? "selected-movie" : ""}`
                  } >
        
        <div className="moviecard__inner">
          
          <div className="moviecard__front box">
            <img className={`image ${this.state.inLibrary ? "in-library" : "not-in-library"}`} src={ this.props.image_url } alt="Movie"/>
            {this.ribbon()}
          </div>
          <div className="moviecard__back">
            
            <p className="movie-title">{ this.props.title } { this.props.release_date ? `(${this.props.release_date.substring(0,4)})`  : "" }  </p>
            <p className="movie-info">{ this.props.overview }</p>
            { this.addButtonText } 
            <button className="movie-button btn btn-secondary" onClick={this.clickAdd}>
              { this.state.inLibrary ? "Select Movie" : "Add to Library" }
            </button>
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