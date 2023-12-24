// Начальное состояние
export const initialState = {
  data: false,
  error: {},
  waiting: false,
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comment/load-start":
      return {...state, data: false, waiting: true, error: {}};

    case "comment/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comment/load-error":
      return {...state, data: false, waiting: false, error: action.payload.data};

    case "comment/reset":
      return {...state, data: false, waiting: false, error: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;