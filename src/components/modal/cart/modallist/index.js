import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modalitem from "../modalitem";
import './style.css';

function ModalList({list, onDeleteItemFromCart}) {

  return (
    <div className="CartList">
      {list.map(item => <Modalitem
          key={item.code}
          item={item}
          onDeleteItemFromCart={onDeleteItemFromCart}
          />)}
      {list.length === 0 && (<div className="CartList-empty">Корзина пуста</div>)}
    </div>
  );
}

ModalList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
  })).isRequired,
  onDeleteItemFromCart: PropTypes.func
}

ModalList.defaultProps = {
  onDeleteItemFromCart: () => {}
}

export default ModalList;