import React from "react";
import PropTypes from "prop-types";
import CartItem from "../cart-item";
import './style.css';

function CartList({list, onDeleteItemFromCart}) {

  return (
    <div className="CartList">
      {list.map(item => <CartItem
          key={item.code}
          item={item}
          onDeleteItemFromCart={onDeleteItemFromCart}
          />)}
      {list.length === 0 && (<div className="CartList-empty">Корзина пуста</div>)}
    </div>
  );
}

CartList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
  })).isRequired,
  onDeleteItemFromCart: PropTypes.func
}

CartList.defaultProps = {
  onDeleteItemFromCart: () => {}
}

export default React.memo(CartList);