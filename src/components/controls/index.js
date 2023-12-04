import React from "react";
import PropTypes from 'prop-types';
import { formatCost, plural } from "../../utils";
import './style.css';

function Controls({goodsCount, totalPrice, onCartSwitch}) {

 return (
    <div className='Controls'>
      <div className="Controls-desc">В корзине:</div>
      <div className="Controls-cart">{goodsCount ?
        `${goodsCount} ${plural(goodsCount, {
          one: "товар",
          few: "товара",
          many: "товаров"
        })} /\ ${formatCost(totalPrice)} ₽` : "пусто"}</div>
      <button className="Controls-button" onClick={() => onCartSwitch()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  goodsCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onCartSwitch: PropTypes.func
};

Controls.defaultProps = {
  onCartSwitch: () => {}
}

export default React.memo(Controls);
