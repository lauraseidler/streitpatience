import socket from '../socket';
import { GAME_VIEWS } from '../variables';
import {
  SET_ONLINE_PLAYERS,
  SET_GAME_VIEW,
  CREATE_NEW_GAME,
  SET_PLAYER_GAME,
  PROMPT_RECONNECT,
  RECONNECT_PLAYER,
  ABORT_RECONNECT
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

const createNewGame = (state, { payload: { gameId, playerId } }) => ({
  ...state,
  games: {
    ...state.games,
    [gameId]: {
      id: gameId,
      players: [playerId]
    }
  }
});

const setPlayerGame = (state, action) => {
  localStorage.setItem('gameId', action.payload.id);
  localStorage.setItem('socketClientId', socket.getId());

  return {
    ...state,
    gameView: GAME_VIEWS.GAME,
    playerGame: action.payload
  };
};

const promptReconnect = state => ({
  ...state,
  gameView: GAME_VIEWS.RECONNECT_PROMPT
});

const reconnectPlayer = (
  state,
  { payload: { gameId, playerId, newPlayerId } }
) => ({
  ...state,
  games: {
    ...state.games,
    [gameId]: {
      ...state.games[gameId],
      players: state.games[gameId].players.map(
        p => (p === playerId ? newPlayerId : p)
      )
    }
  }
});

const abortReconnect = state => {
  localStorage.removeItem('gameId');
  localStorage.removeItem('socketClientId');

  return state;
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ONLINE_PLAYERS:
      return setOnlinePlayers(state, action);
    case SET_GAME_VIEW:
      return setGameView(state, action);
    case CREATE_NEW_GAME:
      return createNewGame(state, action);
    case SET_PLAYER_GAME:
      return setPlayerGame(state, action);
    case PROMPT_RECONNECT:
      return promptReconnect(state);
    case RECONNECT_PLAYER:
      return reconnectPlayer(state, action);
    case ABORT_RECONNECT:
      return abortReconnect(state);
    default:
      return state;
  }
};

export default rootReducer;
