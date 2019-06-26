import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import Library from './components/Library';
import Search from './components/Search';

=======
import Customer from './components/Customer';
// import Movie from './components/Movie';
>>>>>>> befc22984745e42c9ee3fc3010f3a39b186fb6dd

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      customers: [],
      searchTerm: null,
    };
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
    const customerList = this.state.customers.map(customer => {
      console.log(customer);
      return (
        <Customer
          key={customer.id}
          name={customer.name}
          id={customer.id}
          movies_checked_out_count={customer.movies_checked_out_count}
        />
      );
    });

    return (
      <div className="App">
        <header className="App-header">
<<<<<<< HEAD
          <h1 className="App-title">Bust These Blocks</h1>
        </header>
        <input type="text" />
        <input type="submit" />
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
              render={(props) => <Library movies={ this.state.movies } /> } />
            <Route 
              path="/search/" 
              render={(props) => <Search searchTerm={ this.state.searchTerm } /> } />
          </div>
        </Router>
=======
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>{customerList}</div>
>>>>>>> befc22984745e42c9ee3fc3010f3a39b186fb6dd
      </div>
    );
  }
}

export default App;
