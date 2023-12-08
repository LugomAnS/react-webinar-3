import StoreModule from "../module";
import { options } from "./options";

class Settings extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      language: options['ru']
    }
  }

  changeLanguage(value = "ru | en") {
    this.setState({
      ...this.getState(),
      language: {...options[value]}
    }, `Смена языка на - ${value}`);
  }
}

export default Settings;