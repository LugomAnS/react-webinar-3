import React from "react";
import PropTypes from "prop-types";
import './style.css';

function ModalHead({onCartSwitch}) {
  return (
    <div className="Modalhead">
      <h1>Корзина</h1>
      <div className="Modalhead-actions">
        <button onClick={() => onCartSwitch()}>Закрыть</button>
      </div>
  </div>
  )
}

ModalHead.propTypes = {
  onCartSwitch: PropTypes.func
}

ModalHead.defaultProps = {
  onCartSwitch: () => {}
}

export default React.memo(ModalHead);