import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalLayout from "./components/modal/layout";
import CartHead from "./components/modal/cart/cart-head";
import CartList from "./components/modal/cart/cart-list";
import CartFooter from './components/modal/cart/cart-footer';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const {list, cart, isCart, totalPrice, goodsCount } = store.getState();

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
      store.addItemToCart(code);
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
      {isCart && (
        <ModalLayout>
          <CartHead onCartSwitch={callbacks.onCartSwitch}/>
          <CartList
            list={cart}
            onDeleteItemFromCart={callbacks.onDeleteItemFromCart}/>
          <CartFooter totalPrice={totalPrice}/>
        </ModalLayout>
      )}

      <Head title='Магазин'/>
      <Controls
            goodsCount={goodsCount}
            totalPrice={totalPrice}
            onCartSwitch={callbacks.onCartSwitch}/>
      <List list={list}
            onAddItemToCart={callbacks.onAddItemToCart}/>
    </PageLayout>
  );
}

export default App;
