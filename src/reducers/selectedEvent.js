const selectedEventReducer = (state = {}, action) => {
  if (action.type === 'SELECT_EVENT') {
    console.log('Reducer: ', action.payload);
    return action.payload;
  }
  return state;
};

export default selectedEventReducer;
