import {codeGenerator, paginationList} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      pagination: {
        itemsPerPage: 0,
        currentPage: 0,
        totalPages: 0,
        list: []
      }
    }
  }

  async load() {
    const response = await fetch('/api/v1/articles?limit=10&skip=0&fields=items(_id, title, price),count');
    const json = await response.json();
    const list = paginationList({currentPage: 1, totalPages: Math.ceil(json.result.count / 10)});
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pagination: { itemsPerPage: 10, currentPage: 1, totalPages: Math.ceil(json.result.count / 10), list: list }
    }, 'Загружены товары из АПИ');
  }

  async loadPage(pageNumber) {
    const response = await fetch(`/api/v1/articles?
      limit=${this.getState().pagination.itemsPerPage}&skip=${(pageNumber - 1) * 10}&fields=items(_id, title, price),count`);

    const json = await response.json();
    const list = paginationList({currentPage: pageNumber, totalPages: Math.ceil(json.result.count / 10)});
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pagination: {itemsPerPage: 10, currentPage: pageNumber, totalPages: Math.ceil(json.result.count / 10), list: list}
    }, `Загружены данные из АПИ, страница - ${pageNumber}`);
  }
}

export default Catalog;
