import React, { useCallback, useEffect } from "react";
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";
import ItemDetails from "../../components/item-details";

function Details() {
  const {id} = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.details.loadDetails(id);
  }, [id])

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.details.item,
    language: state.settings.language
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    changeLanguage: useCallback(locale => store.actions.settings.changeLanguage(locale), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.item.title} locale={select.language.locale} changeLanguage={callbacks.changeLanguage}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} language={select.language}/>
      <ItemDetails item={select.item} onAdd={callbacks.addToBasket} buttonName={select.language.buttons.add}/>
    </PageLayout>
  )
}

export default React.memo(Details);