import {
  SET_ONLINE_PLAYERS,
  CREATE_NEW_GAME,
  RECONNECT_PLAYER
} from './action-types';

const DEFAULT_STATE = {
  onlinePlayers: 0,
  games: {}
};

const setOnlinePlayers = (state, action) => ({
  ...state,
  onlinePlayers: action.payload
});

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

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ONLINE_PLAYERS:
      return setOnlinePlayers(state, action);
    case CREATE_NEW_GAME:
      return createNewGame(state, action);
    case RECONNECT_PLAYER:
      return reconnectPlayer(state, action);
    default:
      return state;
  }
};

export default rootReducer;
