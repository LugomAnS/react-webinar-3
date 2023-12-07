import React from "react";
import { numberFormat } from "../../utils";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ItemDetails({item, onAdd}){
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
        <button onClick={callbacks.addToBasket}>Добавить</button>
      </div>
    </div>
  )
}

export default React.memo(ItemDetails);