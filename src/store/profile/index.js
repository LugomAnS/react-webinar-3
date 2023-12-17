import StoreModule from "../module";

class ProfileState extends StoreModule {
  initState() {
    return {
      profile: {},
      params: {},
      error: null,
      waiting: false,
    }
  }

  setParams(id, token) {
    this.setState({
      ...this.getState(),
      params: {id: id, token: token},
    });
  }

  /*
   * Загрузка выбранного профиля
  */
  async loadProfile() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/${this.getState().params.id}?fields=email,profile(name,phone)`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': this.getState().params.token,
        }
      });

      const json = await response.json();
      if(response.ok) {
        this.setState({
          ...this.getState(),
          profile: json.result,
          waiting: false,
        }, 'Загружен профиль из АПИ');
      } else {
        throw json.error.message;
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        profile: {},
        error: error,
        waiting: false,
      }, `Ошибка загрузки профиля - ${error}`);
    }
  }
}

export default ProfileState;