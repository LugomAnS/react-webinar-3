export default {
  upload: (data) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comment/load-start'});
      try {
        const responce = await services.api.request({
          url: '/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted',
          method: 'POST',
          body: JSON.stringify(data)
        });

        dispatch({type: 'comment/load-success', payload: { data: responce.data.result }});
      } catch (e) {
        dispatch({type: 'comment/load-error', payload: {data: e}});
      }
    }
  }
}