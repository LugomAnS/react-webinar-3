import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      params: {
        category: "*",
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
      },
      count: 0,
      categoryList: [
        { value: "*", title: "Все"},
      ],
      waiting: false
    }
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has('category')) validParams.category = urlParams.get('category');
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit')) validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');

    const categories = await this.loadCategories();
    await this.setParams({...this.initState().params, ...validParams, ...newParams}, true);

    this.setState({
      ...this.getState(),
      categoryList: [...categories]
    })
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = {...this.initState().params, ...newParams};
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = {...this.getState().params, ...newParams};
    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params,
      waiting: true
    }, 'Установлены параметры каталога');

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();

    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query
    };

    if(params.category !== "*") {
      apiParams['search[category]'] = params.category;
    }

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      waiting: false
    }, 'Загружен список товаров из АПИ');
  }

  async loadCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();
    const list = json.result.items;

    const categories = this.createHierarchy(list, null, "");
    categories.unshift({ value: "*", title: "Все"});
    return categories;
  }

  createHierarchy(list, parent, prefix = '') {
    let arr = [];

    for(let i = 0; i < list.length; i++) {
      if(list[i].parent === parent || list[i].parent?._id === parent) {
        const item = {
          value: list[i]._id,
          title: prefix + list[i].title,
        }
        arr.push(item);
      }
    }

    let result = [];
    for(let i = 0; i < arr.length; i++) {
      result.push(arr[i]);
      result = result.concat(this.createHierarchy(list, arr[i].value, prefix + "- "));
    }

    return result;
  }
}

export default CatalogState;
