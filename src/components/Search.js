import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Search.css';
import Movie from './Movie'

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      searchTerm: "",
      results: [],
    };
  }

  onInputChange = (event) => {
    const updatedState = {};
  
    const field = event.target.name;
    const value = event.target.value;
  
    updatedState[field] = value;
    this.setState(updatedState);
  }
  
  onSubmit = (event) => {
    event.preventDefault();

    const params = {
      params: {
        query: this.state.searchTerm,
      }
    }

    axios.get('http://localhost:3000/movies', params)
      .then(response => {
        this.setState({
          results: response.data,
        })
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });
  }

  // addToLibrary = () => {
    
  // }

  render() {
    console.log(this.props.selectedMovieExternalId)
    const movieComponents = this.state.results.map(movie => {
      return (
        <Movie 
          // SET AN ID IF SELECTED
          key={ movie.external_id }
          external_id={ movie.external_id }
          image_url={ movie.image_url }
          overview={ movie.overview }
          release_date={ movie.release_date }
          title={ movie.title }
          existingMovieIds={ this.props.existingMovieIds }
          selectMovieCallback={ this.props.selectMovieCallback }
          selectedMovieExternalId={ this.props.selectedMovieExternalId }
          // addToLibrary = {this.addToLibrary} 
        />
      )
    });

    return (
    <section className="search">
      <form className="search-form" onSubmit={ this.onSubmit }>
        <input name="searchTerm" value={this.state.searchTerm} type="text" onChange={ this.onInputChange } />
        <input name="submit" type="submit" />
      </form>
      <p>props.searchTerm</p>
      <div className="library">
        { movieComponents }
      </div>
    </section>
    );
  }
};

Search.propTypes = {
  searchTerm: PropTypes.string
};

export default Search;
