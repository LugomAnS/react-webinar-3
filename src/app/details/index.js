import React, { useCallback, useEffect } from "react";
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from "react-router-dom";
import ItemDetails from "../../components/item-details";
import Section from '../../components/section';
import NavigationBar from '../../components/navigation-bar';
import NavigationItem from '../../components/navigation-item';
import SpinnerLayout from '../../components/spinner-layout';

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
    language: state.settings.language,
    loading: state.details.isLoading,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    changeLanguage: useCallback(locale => store.actions.settings.changeLanguage(locale), [store]),
  }

  if(select.loading) return <SpinnerLayout />

  return (
    <PageLayout>
      <Head title={select.item.title} locale={select.language.locale} changeLanguage={callbacks.changeLanguage}/>
      <Section>
        <NavigationBar>
          <NavigationItem title={select.language.buttons.main} route={"/"} />
        </NavigationBar>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} language={select.language}/>
      </Section>
      <ItemDetails item={select.item} onAdd={callbacks.addToBasket} buttonName={select.language.buttons.add}/>
    </PageLayout>
  )
}

export default React.memo(Details);