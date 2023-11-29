import React, { useState } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({list, onCartSwitch}) {
  return (
    <div className='Controls'>
      <div className="Controls-desc">В корзине:</div>
      <div className="Controls-cart">{list.length ?
        `${list.length} ${plural(list.length, {
          one: "товар",
          few: "товара",
          many: "товаров"
        })} \/ ${list.reduce((a, i) => a = a + i.price * i.quantity, 0)} ₽` : "пусто"}</div>
      <button className="Controls-button" onClick={() => onCartSwitch()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })).isRequired,
  onCartSwitch: PropTypes.func
};

Controls.defaultProps = {
  onCartSwitch: () => {}
}

export default React.memo(Controls);
