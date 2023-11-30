import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ModalFooter({cartList}) {
  return (
    <div className="ModalFooter">
      <div>Итого</div>
      <div className="ModalFooter-price">{`${cartList.reduce((a, i) => a = a + i.price * i.quantity, 0)} Р`}</div>
    </div>
  );
}

ModalFooter.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    quantity: PropTypes.number
  })).isRequired
};

export default React.memo(ModalFooter);