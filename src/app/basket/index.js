import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.settings.language
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    // Переход из модалки в детали
    onDetails: useCallback(() => store.actions.modals.close(), [store]),
    // Смена языка
    changeLanguage: useCallback(locale => store.actions.settings.changeLanguage(locale), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} route={`/details/${item._id}`}
                         onDetails={callbacks.onDetails} buttonName={select.language.buttons.delete}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={select.language.titles.cart} onClose={callbacks.closeModal} buttonName={select.language.buttons.close}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} totalName={select.language.titles.total}/>
    </ModalLayout>
  );
}

export default memo(Basket);
