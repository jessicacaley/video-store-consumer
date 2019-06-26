import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Library from './components/Library';
import Search from './components/Search';


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
    return (
      <div className="App">
        <header className="App-header">
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
      </div>
    );
  }
}

export default App;
