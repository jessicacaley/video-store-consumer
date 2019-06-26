import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      searchTerm: "",
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

    const query = this.state.searchTerm;

    // axios.get('http://localhost:3000/customers', params)
    //   .then(response => {
    //     const customers = response.data.flatMap(customer => {
    //       return [{ ...customer }];
    //     });

    //     this.setState({ customers: customers });
    //   })
    //   .catch(error => {
    //     this.setState({ errorMessage: error.message });
    //   });
  }

  render() {
    return (
    <section className="seach">
      <form onSubmit={ this.onSubmit }>
        <input name="searchTerm" onChange={ this.onInputChange } type="text" />
        <input type="submit" />
      </form>
      <p>props.searchTerm</p>
    </section>
    );
  }
};

Search.propTypes = {
  searchTerm: PropTypes.string
};

export default Search;
