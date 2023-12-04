import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.cart = [];
    this.state.isCart = false;
    this.state.goodsCount = 0;
    this.state.totalPrice = 0;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  addItemToCart(code) {
    let item = this.state.cart.find(item => item.code === code);
    item = item ? {...item , quantity: item.quantity + 1} : {...this.state.list.find(item => item.code === code) , quantity:  1};

    const newCart = [...this.state.cart.filter(item => item.code != code), {...item}];
    const newTotalPrice = newCart.reduce((a, i) => a = a + i.price * i.quantity, 0);

    this.setState({
      ...this.state,
      cart: newCart,
      goodsCount: newCart.length,
      totalPrice: newTotalPrice,
    });
  }

  deleteItemFromCart(code) {
    const newCart = this.state.cart.filter(item => item.code != code)
    const newTotalPrice = newCart.reduce((a, i) => a = a + i.price * i.quantity, 0);

    this.setState({
      ...this.state,
      cart: newCart,
      goodsCount: newCart.length,
      totalPrice: newTotalPrice,
    });
  }

  cartSwitch() {
    document.body.style.overflow = !this.state.isCart ? "hidden" : "auto"
    this.setState({
      ...this.state,
      isCart: !this.state.isCart,
    });
  }

  /**
   * Добавление новой записи
   */
  // addItem() {
  //   this.setState({
  //     ...this.state,
  //     list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
  //   })
  // };

  /**
   * Удаление записи по коду
   * @param code
   */
  // deleteItem(code) {
  //   this.setState({
  //     ...this.state,
  //     // Новый список, в котором не будет удаляемой записи
  //     list: this.state.list.filter(item => item.code !== code)
  //   })
  // };

  /**
   * Выделение записи по коду
   * @param code
   */
  // selectItem(code) {
  //   this.setState({
  //     ...this.state,
  //     list: this.state.list.map(item => {
  //       if (item.code === code) {
  //         // Смена выделения и подсчёт
  //         return {
  //           ...item,
  //           selected: !item.selected,
  //           count: item.selected ? item.count : item.count + 1 || 1,
  //         };
  //       }
  //       // Сброс выделения если выделена
  //       return item.selected ? {...item, selected: false} : item;
  //     })
  //   })
  // }
}

export default Store;
