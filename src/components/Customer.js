import React from 'react';
import PropTypes from 'prop-types';
import './Customer.css';
import Avatar from 'react-avatar';

const Customer = props => {
  const clickSelect = () => {
    props.selectCustomerCallback(props);
  }

  let selected = false;

  if(props.selectedCustomer && props.selectedCustomer.id === props.id) {
    selected = true;
  } else {
    selected = false;
  }

  return (
    <section className={`customer_card ${selected ? "selected-customer" : ""}`}>
      <div className="left-side">
        <Avatar className="avatar" name={ props.name }/>
      </div>
      <div className="right-side">
        <h5>{props.name}</h5>
        {/* <p>{`${ props.movies_checked_out_count } movies checked out.`}</p> */}
        <button className="select_button btn btn-secondary" onClick={ clickSelect }>Select Customer</button>
      </div>
    </section>
  );
};

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  movies_checked_out_count: PropTypes.number
};

export default Customer;
