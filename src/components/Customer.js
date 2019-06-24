import React from 'react';
import PropTypes from 'prop-types';

const Customer = (props) => {
  const { id, name } = props;

  // const onClicked = () => {
  //   props.getThing(id, name);
  // };

  return (
    <section className="customer">
      <h3>{ name }</h3>
      <h4>{ id }</h4>
      {/* <div className="select_this_thing">
        <button className="select_thing_button" onClick={onClicked}>
          Select Thing
        </button>
      </div> */}
    </section>
  );
};

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  // add others if necessary
};

export default Customer;