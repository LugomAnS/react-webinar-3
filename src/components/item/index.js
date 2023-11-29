import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onAddItemToCart: (item) => {
      props.onAddItemToCart(item);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'>{props.item.price + " ₽"}</div>
      <div className='Item-actions'>
        <button onClick={() => callbacks.onAddItemToCart(props.item)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddItemToCart: PropTypes.func
};

Item.defaultProps = {
  onAddItemToCart: () => {}
}

export default React.memo(Item);
