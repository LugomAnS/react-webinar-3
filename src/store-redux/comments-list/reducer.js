// Начальное состояние списка коментариев
export const initialState = {
  list: {},
  error: {},
  waiting: false,
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch(action.type) {
    case "commentsList/load-start":
      return {...state, list: {}, waiting: true, error: {} };

    case "commentsList/load-success":
      return {...state, list: action.payload.data, waiting: false };

    case "commentsList/load-error":
      return {...state, waiting: false, error: action.payload.data };

    case "commentsList/add-comment":
      const newList = {...state.list};
      newList.items.push(action.payload.data);
      newList.count++;
      return {...state, list: {...newList}};
    default:
      return state;
  }
}

export default reducer;