import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      user: {},
      token: null,
      serverError: null,
      waiting: false,
      auth: false,
    }
  }

  async initUser() {
    if(localStorage.getItem("YLAB_token") !== null) {
      await this.tokenAuthorization();
    }
  }

  resetErrors() {
    this.setState(({
      ...this.getState(),
      serverError: null,
    }))
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
      const response = await fetch('/api/v1/users/sign?fields=profile(name)', {
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
          auth: true,
        }, "Успешная авторизация по логину и паролю");
        localStorage.setItem("YLAB_token", this.getState().token);
      } else {
        this.setState({
          ...this.getState(),
          serverError: json.error.data.issues[0].message,
          waiting: false,
          auth: false,
        }, "Ошибка авторизации")
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        serverError: error,
        waiting: false,
        auth: false,
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
      token: localStorage.getItem("YLAB_token"),
    }, 'Установка токена и ожидание авторизации по токену')

    try {
      const response = await fetch('/api/v1/users/self?fields=profile(name)', {
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
          auth: true,
        }, "Успешная авторизация по токену");
      } else {
        this.setState({
          ...this.getState(),
          serverError: json.error.data.issues[0].message,
          waiting: false,
          auth: false,
        }, "Ошибка авторизации по токену")
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        serverError: error,
        waiting: false,
        auth: false,
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
      auth: false,
    }, "Выход пользователя из учетной записи");
  }

}

export default UserState;