import socket from '../socket';
import { GAME_VIEWS } from '../variables';
import {
  SET_ONLINE_PLAYERS,
  SET_GAME_VIEW,
  SET_CURRENT_GAME,
  PROMPT_RECONNECT,
  ABORT_RECONNECT,
  SET_GAMES,
  SET_USERNAME,
  SET_ERROR_MESSAGE,
  REMOVE_ERROR_MESSAGE
} from './action-types';
import { removeErrorMessage as removeErrorMessageAction } from './actions';
import store from './store';

const DEFAULT_STATE = {
  currentGame: null,
  errorMessages: [],
  games: [],
  gameView: GAME_VIEWS.ACTION_BOARD,
  onlinePlayers: 0,
  username: null
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
  localStorage.setItem('clientId', socket.getId());

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
  localStorage.removeItem('clientId');

  return {
    ...state,
    gameView: GAME_VIEWS.ACTION_BOARD
  };
};

const setGames = (state, action) => ({
  ...state,
  games: action.payload
});

const setUsername = (state, action) => {
  localStorage.setItem('username', action.payload);

  return {
    ...state,
    username: action.payload
  };
};

const setErrorMessage = (state, action) => {
  setTimeout(() => {
    store.dispatch(removeErrorMessageAction());
  }, 2500);

  return {
    ...state,
    errorMessages: [...state.errorMessages, action.payload]
  };
};

const removeErrorMessage = state => ({
  ...state,
  errorMessages: state.errorMessages.slice(1)
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
    case SET_USERNAME:
      return setUsername(state, action);
    case SET_ERROR_MESSAGE:
      return setErrorMessage(state, action);
    case REMOVE_ERROR_MESSAGE:
      return removeErrorMessage(state);
    default:
      return state;
  }
};

export default rootReducer;
