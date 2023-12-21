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
      return {...state, data: {}, waiting: true, error: {}};

    case "comment/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comment/load-error":
      return {...state, data: {}, waiting: false, error: action.payload.data};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;