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
      isLoading: false,
      pagination: {
        itemsPerPage: 10,
        currentPage: 0,
        totalPages: 0,
      }
    }
  }

  async load() {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });
    const response = await fetch('/api/v1/articles?limit=10&skip=0&fields=items(_id, title, price),count');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pagination: { itemsPerPage: 10,
                    currentPage: 1,
                    totalPages: Math.ceil(json.result.count / this.getState().pagination.itemsPerPage)},
      isLoading: false,
    }, 'Загружены товары из АПИ');
  }

  async loadPage(pageNumber) {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });

    const response = await fetch(`/api/v1/articles?limit=${this.getState().pagination.itemsPerPage}
        &skip=${(pageNumber - 1) * this.getState().pagination.itemsPerPage}&fields=items(_id, title, price),count`);

    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pagination: { itemsPerPage: 10,
                    currentPage: pageNumber,
                    totalPages: Math.ceil(json.result.count / this.getState().pagination.itemsPerPage) },
      isLoading: false
    }, `Загружены данные из АПИ, страница - ${pageNumber}`);
  }
}

export default Catalog;
