import StoreModule from '../module';

class CategoryState extends StoreModule {
  initState() {
    return {
      list: [
        { value: "*", title: "Все"},
      ]
    }
  }

  async initCategories() {
    const categories = await this.loadCategories();

    this.setState({
      list: [...categories],
    }, "Загружены категории товаров из АПИ");
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

export default CategoryState;