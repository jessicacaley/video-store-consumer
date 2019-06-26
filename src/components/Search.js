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
        console.log( response.data )
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
    const movieComponents = this.state.results.map(movie => {
      console.log(movie)
      return (
        <Movie 
          // SET AN ID IF SELECTED
          key={ movie.external_id }
          external_id={ movie.external_id }
          image_url={ movie.image_url }
          overview={ movie.overview }
          release_date={ movie.release_date }
          title={ movie.title }
          // addToLibrary = {this.addToLibrary} 
        />
      )
    });

    return (
    <section className="seach">
      <form onSubmit={ this.onSubmit }>
        <input name="searchTerm" onChange={ this.onInputChange } type="text" />
        <input type="submit" />
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
