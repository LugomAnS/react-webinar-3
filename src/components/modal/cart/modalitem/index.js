import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ModalItem({item, onDeleteItemFromCart}) {

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      onDeleteItemFromCart(item.code);
    }
  };

  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-cartprice">{`${item.price} ₽`}</div>
      <div className="Item-quantity">{`${item.quantity} шт`}</div>
      <div className="Item-actions">
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
  </div>
  );
}

ModalItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
  onDeleteItemFromCart: PropTypes.func
};

ModalItem.defaultProps = {
  onDeleteItemFromCart: () => {}
}

export default React.memo(ModalItem);