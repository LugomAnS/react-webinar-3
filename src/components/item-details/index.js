import React from "react";
import { numberFormat } from "../../utils";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemDetails({item, onAdd, buttonName}){
  const cn = bem('ItemDetails');

  const callbacks = {
    addToBasket: () => onAdd(item._id)
  };

  return (
    <div className={cn()}>
      <div>{item.description}</div>
      <div>{"Страна производитель: "}<span className={cn("cell")}>{item.madeIn.title + " (" + item.madeIn.code +")"}</span></div>
      <div>{"Категория: "}<span className={cn("cell")}>{item.category.title}</span></div>
      <div>{"Год выпуска: "}<span className={cn("cell")}>{item.edition}</span></div>
      <div className={cn("price")}>{"Цена: "}{numberFormat(item.price)}{" ₽"}</div>
      <div>
        <button onClick={callbacks.addToBasket}>{buttonName}</button>
      </div>
    </div>
  )
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string
    }),
    edition: PropTypes.number,
    price: PropTypes.number
  }),
  buttonName: PropTypes.string,
  onAdd: PropTypes.func,
}

ItemDetails.defaultProps = {
  onAdd: () => {}
}

export default React.memo(ItemDetails);