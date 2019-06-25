import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Movie from './components/Movie';

class App extends Component {
  constructor() {
    super();

    this.state = { 
      movies: [],
      customers: [],
    };
  }


  componentDidMount = () => {
    axios.get('http://localhost:3000/')
    .then((response) => {
      const movies = response.data.flatMap(movie => { return [{ ...movie }] });

      this.setState({ movies: movies });
    })
    .catch((error) => {
      this.setState({ errorMessage: error.message });
    });
  }
  
  render() {
    const movieComponents = this.state.movies.map(movie => {
      return (
        <Movie 
          key={ movie.id } 
          id={ movie.id }
          external_id={ movie.external_id }
          title={ movie.title }
          overview={ movie.overview }
          release_date={ movie.release_date }
          image_url={movie.image_url} />
      )
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        { movieComponents }
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
