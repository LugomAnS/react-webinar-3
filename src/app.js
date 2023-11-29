import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cartList = store.getState().cart;

  const callbacks = {
    onAddItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, [store]),

    onCartSwitch: useCallback(() => {
      store.cartSwitch();
    }, [store])
  }

  return (
    <PageLayout>
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
