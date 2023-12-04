import React from "react";
import PropTypes from "prop-types";
import { formatCost } from "../../../../utils";
import './style.css';

function CartFooter({totalPrice}) {
  return (
    <div className="Cartfooter">
      <div>Итого</div>
      <div className="Cartfooter-price">{`${formatCost(totalPrice)} Р`}</div>
    </div>
  );
}

CartFooter.propTypes = {
 totalPrice: PropTypes.number.isRequired
};

export default React.memo(CartFooter);