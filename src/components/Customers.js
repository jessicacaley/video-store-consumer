import React from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer'
import './Customers.css'

const Customers = (props) => {
  const { customers, selectCustomerCallback, selectedCustomer} = props;

  const customerList = customers.map(customer => {
    return (
      <Customer
        key={customer.id}
        name={customer.name}
        id={customer.id}
        movies_checked_out_count={customer.movies_checked_out_count}
        selectCustomerCallback={selectCustomerCallback}
        selectedCustomer={selectedCustomer} />
    );
  });

  return (
    <div className="customers">
      {customerList}
    </div>
  );
};

Customers.propTypes = {
  customers: PropTypes.array.isRequired,
  // add others if necessary
};

export default Customers;