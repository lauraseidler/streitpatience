import socket from '../socket';
import { GAME_VIEWS } from '../variables';
import {
  SET_ONLINE_PLAYERS,
  SET_GAME_VIEW,
  SET_CURRENT_GAME,
  PROMPT_RECONNECT,
  ABORT_RECONNECT,
  SET_GAMES
} from './action-types';

const DEFAULT_STATE = {
  onlinePlayers: 0,
  gameView: GAME_VIEWS.ACTION_BOARD,
  currentGame: null,
  games: []
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

const setCurrentGame = (state, action) => {
  localStorage.setItem('gameId', action.payload.id);
  localStorage.setItem('socketClientId', socket.getId());

  return {
    ...state,
    gameView: GAME_VIEWS.GAME,
    currentGame: action.payload
  };
};

const promptReconnect = state => ({
  ...state,
  gameView: GAME_VIEWS.RECONNECT_PROMPT
});

const abortReconnect = state => {
  localStorage.removeItem('gameId');
  localStorage.removeItem('socketClientId');

  return {
    ...state,
    gameView: GAME_VIEWS.ACTION_BOARD
  };
};

const setGames = (state, action) => ({
  ...state,
  games: action.payload
});

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ONLINE_PLAYERS:
      return setOnlinePlayers(state, action);
    case SET_GAME_VIEW:
      return setGameView(state, action);
    case SET_CURRENT_GAME:
      return setCurrentGame(state, action);
    case PROMPT_RECONNECT:
      return promptReconnect(state);
    case ABORT_RECONNECT:
      return abortReconnect(state);
    case SET_GAMES:
      return setGames(state, action);
    default:
      return state;
  }
};

export default rootReducer;
