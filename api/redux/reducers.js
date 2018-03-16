import {
  SET_ONLINE_PLAYERS,
  CREATE_NEW_GAME,
  RECONNECT_PLAYER,
  ADD_PLAYER,
  DISCONNECT_PLAYER
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

const createNewGame = (state, { payload: { gameId, playerId, username } }) => ({
  ...state,
  games: [...state.games, { id: gameId, name: `Game by ${username}` }],
  gameDetails: {
    ...state.gameDetails,
    [gameId]: {
      id: gameId,
      name: `Game by ${username}`,
      players: [
        {
          id: playerId,
          username
        }
      ]
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
        p => (p.id === playerId ? { ...p, id: newPlayerId, offline: false } : p)
      )
    }
  }
});

const addPlayer = (state, { payload: { gameId, playerId, username } }) => {
  const game = state.gameDetails[gameId];

  if (!game || game.players.length !== 1) {
    return state;
  }

  return {
    ...state,
    games: state.games.filter(g => g.id !== gameId),
    gameDetails: {
      ...state.gameDetails,
      [gameId]: {
        ...state.gameDetails[gameId],
        players: [
          ...state.gameDetails[gameId].players,
          {
            id: playerId,
            username
          }
        ]
      }
    }
  };
};

const disconnectPlayer = (state, { payload: { gameId, playerId } }) => {
  const game = state.gameDetails[gameId];

  // if the player is not in the given game, do nothing
  if (game.players.map(p => p.id).indexOf(playerId) === -1) {
    return state;
  }

  // if player is the only online player, remove game
  if (game.players.filter(p => !p.offline).length === 1) {
    const { [gameId]: deletedGame, ...restGames } = state.gameDetails;

    return {
      ...state,
      games: state.games.filter(g => g.id !== gameId),
      gameDetails: restGames
    };
  }

  // mark player as offline if in an active game
  return {
    ...state,
    gameDetails: {
      ...state.gameDetails,
      [gameId]: {
        ...state.gameDetails[gameId],
        players: state.gameDetails[gameId].players.map(
          p => (p.id === playerId ? { ...p, offline: true } : p)
        )
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
    case DISCONNECT_PLAYER:
      return disconnectPlayer(state, action);
    default:
      return state;
  }
};

export default rootReducer;
