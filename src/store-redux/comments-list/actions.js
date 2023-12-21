export default {
  loadList: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: "commentsList/load-start"});

      try {
        const response = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
          method: 'GET',
        });

        dispatch({type: "commentsList/load-success", payload: {data: response.data.result}});
      } catch (error) {
        dispatch({type: "comment/load-error", payload: {data: error}});
      }
    }
  }
}