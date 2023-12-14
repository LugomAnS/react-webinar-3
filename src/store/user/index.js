import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      user: {},
      token: null,
      serverError: null,
      waiting: false,
    }
  }

  async initUser() {
    if(localStorage.getItem("YLAB_token") !== null) {
      await this.tokenAuthorization();
    }
  }

  /*
   * Авторизация по логину и паролю
  */
  async login(username, password) {
    const credentials = {
      login: username,
      password: password
    }

    this.setState({
      ...this.getState(),
      waiting: true,
    })

    try {
      const response = await fetch('/api/v1/users/sign?fields=email,profile(name,phone)', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const json = await response.json();
      if(response.ok) {
        this.setState({
          ...this.getState(),
          user: json.result.user,
          token: json.result.token,
          waiting: false,
          serverError: null,
        }, "Успешная авторизация по логину и паролю");
        localStorage.setItem("YLAB_token", this.getState().token);
      } else {
        this.setState({
          ...this.getState(),
          serverError: json.error.data.issues[0].message,
          waiting: false,
        }, "Ошибка авторизации")
      }
    } catch (error) {
      console.log(error);
      this.setState({
        ...this.getState(),
        serverError: error,
      })
    }
  }

  /*
   * Авторизация по токену
  */
  async tokenAuthorization() {
    this.setState({
      ...this.getState(),
      waiting: true,
    })

    try {
      const response = await fetch('/api/v1/users/self?fields=email,profile(name,phone)', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem("YLAB_token"),
        }
      });

      const json = await response.json();
      if(response.ok) {
        this.setState({
          ...this.getState(),
          user: json.result,
          token: localStorage.getItem("YLAB_token"),
          serverError: null,
          waiting: false,
        }, "Успешная авторизация по токену");
      } else {
        this.setState({
          ...this.getState(),
          serverError: json.error.data.issues[0].message,
          waiting: false,
        }, "Ошибка авторизации по токену")
      }
    } catch (error) {
      console.log(error);
      this.setState({
        ...this.getState(),
        serverError: error,
      })
    }
  }

  /*
   * Выход из учетной записи
   */
  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem("YLAB_token"),
      }
    });

    localStorage.removeItem("YLAB_token");
    this.setState({
      ...this.getState(),
      user: {},
      token: null,
      waiting: false,
    }, "Выход пользователя из учетной записи");
  }

}

export default UserState;