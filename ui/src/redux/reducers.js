import { SET_ONLINE_PLAYERS } from './actions';

const DEFAULT_STATE = {
  onlinePlayers: 0
};

const setOnlinePlayers = (state, action) => ({
  ...state,
  onlinePlayers: action.payload
});

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ONLINE_PLAYERS:
      return setOnlinePlayers(state, action);
    default:
      return state;
  }
};

export default rootReducer;
