import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination/pagination';
import Section from '../../components/section';
import NavigationBar from '../../components/navigation-bar';
import NavigationItem from '../../components/navigation-item';
import SpinnerLayout from '../../components/spinner-layout';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagination: state.catalog.pagination,
    language: state.settings.language,
    loading: state.catalog.isLoading,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Загрузка страницы товаров
    loadGoodsPage: useCallback(pageNumber => store.actions.catalog.loadPage(pageNumber), [store]),
    // Смена языка
    changeLanguage: useCallback(locale => store.actions.settings.changeLanguage(locale), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}
                   buttonName={select.language.buttons.add} route={`/details/${item._id}`}/>
    }, [callbacks.addToBasket, select.language]),
  };

  if(select.loading) return <SpinnerLayout />

  return (
    <PageLayout>
      <Head title={select.language.titles.mainHead} locale={select.language.locale} changeLanguage={callbacks.changeLanguage}/>
      <Section>
        <NavigationBar>
          <NavigationItem title={select.language.buttons.main} route={"/"} />
        </NavigationBar>
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} language={select.language}/>
      </Section>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination pagination={select.pagination}
                  onLoad={callbacks.loadGoodsPage} />
    </PageLayout>
  );
}

export default memo(Main);
