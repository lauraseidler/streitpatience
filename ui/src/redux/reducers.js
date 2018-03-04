import { GAME_VIEWS } from '../variables';
import { SET_ONLINE_PLAYERS, SET_GAME_VIEW } from './actions';

const DEFAULT_STATE = {
  onlinePlayers: 0,
  gameView: GAME_VIEWS.ACTION_BOARD
};

const setOnlinePlayers = (state, action) => ({
  ...state,
  onlinePlayers: action.payload
});

const setGameView = (state, action) => {
  // do nothing if game view is not supported
  if (!GAME_VIEWS[action.payload]) {
    return state;
  }

  return {
    ...state,
    gameView: action.payload
  };
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ONLINE_PLAYERS:
      return setOnlinePlayers(state, action);
    case SET_GAME_VIEW:
      return setGameView(state, action);
    default:
      return state;
  }
};

export default rootReducer;
