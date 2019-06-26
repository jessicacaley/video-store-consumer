import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Library from './components/Library';
import Search from './components/Search';
import Customers from './components/Customers';
// import Movie from './components/Movie';

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      customers: [],
      selectedMovie: null,
      selectedCustomer: null,
      searchTerm: null,
    };
  }

  selectCustomer = (customer) => {
    this.setState({
      selectedCustomer: customer,
    })
  }

  selectMovie = (movie) => {
    this.setState({
      selectedMovie: movie,
    })
  }

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

  render() {
    console.log(this.state.selectedMovie)
    console.log(this.state.selectedCustomer)

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bust These Blocks</h1>
          <p>movie: {this.state.selectedMovie ? this.state.selectedMovie.title : ""}</p>
          <p>customer: {this.state.selectedCustomer ? this.state.selectedCustomer.name : "" }</p>

        </header>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/library/">Library</Link>
                </li>
                <li>
                  <Link to="/customers/">Customers</Link>
                </li>
                <li>
                  <Link to="/search/">Search</Link>
                </li>
              </ul>
            </nav>
            <Route 
              path="/library/" 
              render={(props) => <Library movies={ this.state.movies } selectMovieCallback={ this.selectMovie } /> } />
            <Route
              path="/customers/"
              render={(props) => <Customers customers={ this.state.customers } selectCustomerCallback={ this.selectCustomer } /> } />
            <Route 
              path="/search/" 
              render={(props) => <Search /> } />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
