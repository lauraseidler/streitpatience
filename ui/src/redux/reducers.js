import { GAME_VIEWS } from '../variables';
import {
  SET_ONLINE_PLAYERS,
  SET_GAME_VIEW,
  CREATE_NEW_GAME,
  START_PLAYER_GAME
} from './actions';

const DEFAULT_STATE = {
  onlinePlayers: 0,
  gameView: GAME_VIEWS.ACTION_BOARD,
  games: {},
  playerGame: null
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

const createNewGame = (state, action) => ({
  ...state,
  games: {
    ...state.games,
    [action.payload]: {
      id: action.payload,
      players: [action.payload]
    }
  }
});

const startPlayerGame = (state, action) => ({
  ...state,
  gameView: GAME_VIEWS.GAME,
  playerGame: action.payload
});

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ONLINE_PLAYERS:
      return setOnlinePlayers(state, action);
    case SET_GAME_VIEW:
      return setGameView(state, action);
    case CREATE_NEW_GAME:
      return createNewGame(state, action);
    case START_PLAYER_GAME:
      return startPlayerGame(state, action);
    default:
      return state;
  }
};

export default rootReducer;
