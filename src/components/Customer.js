import React from 'react';
import PropTypes from 'prop-types';
import './Customer.css';

const Customer = props => {
  const clickSelect = () => {
    props.selectCustomerCallback(props);
  }

  return (
    <section className="customer_card">
      <div className="customer_name">{props.name}</div>
      <div className="select_customer">
        <p>{`${props.movies_checked_out_count} movies checked out.`}</p>
        <button className="select_button" onClick={clickSelect}>Select Customer</button>
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
