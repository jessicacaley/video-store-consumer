import React from 'react';
import PropTypes from 'prop-types';

const Customer = (props) => {
  const { id, name } = props;
  
  return (
    <section className="customer">
      <h3>{ name }</h3>
      <h4>{ id }</h4>
    </section>
  );
};

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  // add others if necessary
};

export default Customer;