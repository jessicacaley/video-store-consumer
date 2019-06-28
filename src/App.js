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

  rentMovie = (event) => {
    // event.preventD
    const params = {
      customer_id: this.state.selectedCustomer.id,
      due_date: "Fri, 30 Jun 2019"
    }
    axios.post(`http://localhost:3000/rentals/${this.state.selectedMovie.title}/check-out`, params)
      .then(response => {
        window.confirm(`${this.state.selectedCustomer.name} successfully checked out ${this.state.selectedMovie.title}`);
        this.setState({
          selectedMovie: null,
          selectedCustomer: null,
        });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });
    
  }

  componentDidUpdate(previousProps,previousState) {
    if (this.state.customers !== previousState.customers) {
      this.getCustomers();
    }
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

        function compareMovieTitles(a, b) {
          let titleA = a.title.toUpperCase();
          let titleB = b.title.toUpperCase();

          const splitTitleA = titleA.split(" ")
          const splitTitleB = titleB.split(" ")

          // ignore "a" and "the" at the beginning of titles when alphabetizing
          if(splitTitleA[0] === "A" || splitTitleA[0] === "THE" || splitTitleA[0] === "AN") {
            titleA = splitTitleA.slice(1,splitTitleA.length).join(" ")
          }
          if(splitTitleB[0] === "A" || splitTitleB[0] === "THE" || splitTitleB[0] === "AN") {
            titleB = splitTitleB.slice(1,splitTitleB.length).join(" ")
          }
        
          let comparison = 0;
          if (titleA > titleB) {
            comparison = 1;
          } else if (titleA < titleB) {
            comparison = -1;
          }
          return comparison;
        }

        movies.sort(compareMovieTitles);

        this.setState({ movies: movies });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });
  }

  getCustomers = () => {
    axios
    .get('http://localhost:3000/customers')
    .then(response => {
      const customers = response.data.flatMap(customer => {
        return [{ ...customer }];
      });

      function compareLastNames(a, b) {
        const nameA = a.name.split(" ")[1].toUpperCase();
        const nameB = b.name.split(" ")[1].toUpperCase();
      
        let comparison = 0;
        if (nameA > nameB) {
          comparison = 1;
        } else if (nameA < nameB) {
          comparison = -1;
        }
        return comparison;
      }
      
      customers.sort(compareLastNames);

      this.setState({ customers: customers });
    })
    .catch(error => {
      this.setState({ errorMessage: error.message });
    });
  }

  componentDidMount = () => {
    this.getMovies();

    this.getCustomers();
  };

  resetMovies = () => {
    this.getMovies();
  }

  render() {
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
