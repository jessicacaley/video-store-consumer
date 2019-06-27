import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Library from './components/Library';
import Search from './components/Search';
import Customers from './components/Customers';
import './App.css';
// import Movie from './components/Movie';

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      customers: [],
      selectedMovie: null,
      selectedCustomer: null,
      searchTerm: null
    };
  }

  selectCustomer = customer => {
    this.setState({
      selectedCustomer: customer
    });
  };

  selectMovie = movieExternalId => {
    let selectedMovie = null;
    this.state.movies.forEach(movie => {
      if (movie.external_id === movieExternalId) {
        selectedMovie = movie;
      }
    });
    this.setState({
      selectedMovie: selectedMovie
    });
  };

  getMovies = () => {
    axios
      .get('http://localhost:3000/')
      .then(response => {
        const movies = response.data.flatMap(movie => {
          return [{ ...movie }];
        });

        this.setState({ movies: movies });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });
  }

  componentDidMount = () => {
    this.getMovies();

    axios
      .get('http://localhost:3000/customers')
      .then(response => {
        const customers = response.data.flatMap(customer => {
          return [{ ...customer }];
        });

        this.setState({ customers: customers });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });
  };

  resetMovies = () => {
    this.getMovies();
  }

  render() {
    console.log(this.state.selectedMovie);
    console.log(this.state.selectedCustomer);
    const buttonClass =
      this.state.selectedCustomer && this.state.selectedMovie
        ? 'buttonDisplay'
        : 'buttonNonDisplay';

    const existingMovieIds = this.state.movies.map(movie => movie.external_id);

    return (
      <div className="App">
        <Router>
          <nav className="flex-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/library">Library</Link>
              </li>
              <li>
                <Link to="/customers">Customers</Link>
              </li>
              <li className="text">
                <p>Selected Movie:</p>
                {this.state.selectedMovie && (
                <span className="current_style">
                  {this.state.selectedMovie.title}
                </span>
                )}
              </li>
              <li className="text">
                <p>Selected Customer:</p>
                {this.state.selectedCustomer && (
                  <span className="current_style">
                    {this.state.selectedCustomer.name}
                  </span>
                )}
              </li>
              <li className="text">
                <button onClick={this.rentMovie} className={buttonClass}>
                  Check Out
                </button>
              </li>
            </ul>
          </nav>
          {this.state.msg && (
            <div className="errors_container">
              <h3>{this.state.msg}</h3>
              <button className="closeError" onClick={this.closeMessage}>
                <strong>&#10007;</strong>
              </button>
            </div>
          )}

          {/* <Route
            path="/library"
            render={() => (
              <Library
                movies={this.state.movies}
                selectMovieCallback={this.selectMovie}
              />
            )}
          /> */}
          {/* <Route
            path="/customers"
            render={() => (
              <Customers
                customers={this.state.customers}
                selectCustomerCallback={this.selectCustomer}
              />
            )}
          /> */}
          {/* <Route path="/search/" render={props => <Search />} /> */}
          <div>
            <Route
              path="/library/"
              render={props => (
                <Library
                  movies={this.state.movies}
                  selectMovieCallback={this.selectMovie}
                  existingMovieIds={existingMovieIds}
                  selectedMovieExternalId={
                    this.state.selectedMovie
                      ? this.state.selectedMovie.external_id
                      : ''
                  }
                />
              )}
            />
            <Route
              path="/customers/"
              render={props => (
                <Customers
                  customers={this.state.customers}
                  selectCustomerCallback={this.selectCustomer}
                  selectedCustomer={this.state.selectedCustomer}
                />
              )}
            />
            <Route
              path="/search/"
              render={props => (
                <Search
                  existingMovieIds={existingMovieIds}
                  selectMovieCallback={this.selectMovie}
                  selectedMovieExternalId={
                    this.state.selectedMovie
                      ? this.state.selectedMovie.external_id
                      : ''
                  }
                  resetMovies={this.resetMovies}

                  // addToLibrary={addToLibrary}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
