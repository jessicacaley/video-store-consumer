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

  componentDidMount = () => {
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

  rentMovie = () => {
    if (this.state.movieId && this.state.customerId) {
      let dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);
      const { selectedMovie, customerId, movieId } = this.state;
      const url = `'http://localhost:3000/rentals'${selectedMovie}/check-out`;

      const rental = {
        movie_id: movieId,
        customer_id: customerId,
        due_date: dueDate
      };

      axios
        .post(url, rental)
        .then(() => {
          const customers = [...this.state.customers];
          let customer = customers.find(
            person => person.id === this.state.customerId
          );
          const customerIndex = customers.findIndex(
            person => person.id === this.state.customerId
          );
          customer.movies_checked_out_count += 1;
          customers[customerIndex] = customer;
          this.setState({
            movieId: null,
            customerId: null,
            selectedMovie: '',
            selectedCustomer: '',
            customers
          });
          this.setMessages('Successfully added rental');
        })
        .catch(error => {
          this.setMessages(error.message);
        });
    }
  };

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
          <nav className="navbar navbar-dark bg-dark sticky-top">
            <div className="nav-item nav-link">
              <Link to="/">Home</Link>
            </div>
            <div className="nav-item nav-link">
              <Link to="/search">Search</Link>
            </div>
            <div className="nav-item nav-link">
              <Link to="/library">Library</Link>
            </div>
            <div className="nav-item nav-link">
              <Link to="/customers">Customers</Link>
            </div>
            <div>
              <p>Selected Movie:</p>
              {this.state.selectedMovie && (
                <span className="current_style">
                  {this.state.selectedMovie.title}
                </span>
              )}
            </div>
            <div>
              <p>Selected Customer:</p>
              {this.state.selectedCustomer && (
                <span className="current_style">
                  {this.state.selectedCustomer.name}
                </span>
              )}
            </div>
            <div className="nav-item nav-link">
              <button onClick={this.rentMovie} className={buttonClass}>
                Check Out
              </button>
            </div>
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
