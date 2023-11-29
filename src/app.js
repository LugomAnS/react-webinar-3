import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalLayout from "./components/modal/layout";
import ModalHead from "./components/modal/cart/modalhead";
import ModalList from "./components/modal/cart/modallist";
import Modalfooter from './components/modal/cart/modalfooter';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const list = store.getState().list;
  const cartList = store.getState().cart;
  const modalState = store.getState().isCart;

  const callbacks = {
    onAddItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, [store]),

    onDeleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, [store]),

    onCartSwitch: useCallback(() => {
      store.cartSwitch();
    }, [store])
  }

  return (
    <PageLayout>
      {modalState && (
        <ModalLayout>
          <ModalHead onCartSwitch={callbacks.onCartSwitch}/>
          <ModalList
            list={cartList}
            onDeleteItemFromCart={callbacks.onDeleteItemFromCart}/>
          <Modalfooter cartList={cartList}/>
        </ModalLayout>
      )}
      <Head title='Приложение на чистом JS'/>
      <Controls
            list={cartList}
            onCartSwitch={callbacks.onCartSwitch}/>
      <List list={list}
            onAddItemToCart={callbacks.onAddItemToCart}/>
    </PageLayout>
  );
}

export default App;
