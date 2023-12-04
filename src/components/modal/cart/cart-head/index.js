import React from "react";
import PropTypes from "prop-types";
import './style.css';

function CartHead({onCartSwitch}) {
  return (
    <div className="Carthead">
      <h1>Корзина</h1>
      <div className="Carthead-actions">
        <button onClick={() => onCartSwitch()}>Закрыть</button>
      </div>
  </div>
  )
}

CartHead.propTypes = {
  onCartSwitch: PropTypes.func
}

CartHead.defaultProps = {
  onCartSwitch: () => {}
}

export default React.memo(CartHead);