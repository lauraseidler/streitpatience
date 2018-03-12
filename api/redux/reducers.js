import {
  SET_ONLINE_PLAYERS,
  CREATE_NEW_GAME,
  RECONNECT_PLAYER,
  ADD_PLAYER
} from './action-types';

const DEFAULT_STATE = {
  onlinePlayers: 0,
  games: [],
  gameDetails: {}
};

const setOnlinePlayers = (state, action) => ({
  ...state,
  onlinePlayers: action.payload
});

const createNewGame = (state, { payload: { gameId, playerId } }) => ({
  ...state,
  games: [...state.games, gameId],
  gameDetails: {
    ...state.gameDetails,
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
  gameDetails: {
    ...state.gameDetails,
    [gameId]: {
      ...state.gameDetails[gameId],
      players: state.gameDetails[gameId].players.map(
        p => (p === playerId ? newPlayerId : p)
      )
    }
  }
});

const addPlayer = (state, { payload: { gameId, playerId } }) => {
  const game = state.gameDetails[gameId];

  if (game.players.length > 1) {
    return state;
  }

  return {
    ...state,
    games: state.games.filter(g => g !== gameId),
    gameDetails: {
      ...state.gameDetails,
      [gameId]: {
        ...state.gameDetails[gameId],
        players: [...state.gameDetails[gameId].players, playerId]
      }
    }
  };
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ONLINE_PLAYERS:
      return setOnlinePlayers(state, action);
    case CREATE_NEW_GAME:
      return createNewGame(state, action);
    case RECONNECT_PLAYER:
      return reconnectPlayer(state, action);
    case ADD_PLAYER:
      return addPlayer(state, action);
    default:
      return state;
  }
};

export default rootReducer;
