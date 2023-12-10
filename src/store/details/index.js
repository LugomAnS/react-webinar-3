import StoreModule from "../module";

class Details extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      isLoading: false,
      item: {
        _id: "",
        title: "",
        description: "",
        madeIn: {
          title: "",
          code: ""
        },
        category: {
          title: ""
        },
        edition: 0,
        price: 0
      }
    }
  }

  async loadDetails(id) {
    this.setState({
      ...this.getState(),
      isLoading: true,
    })

    const response = await fetch(`/api/v1/articles/${id}?fields=title,description,category(title),madeIn(title,code),edition,price`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result,
      isLoading: false,
    }, `Загрузка из АПИ детализации по товару - ${id}`);
  }
}

export default Details;