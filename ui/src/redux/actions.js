export const SET_ONLINE_PLAYERS = 'SET_ONLINE_PLAYERS';

export function setOnlinePlayers(onlinePlayers) {
  return { type: SET_ONLINE_PLAYERS, payload: onlinePlayers };
}

export const SET_GAME_VIEW = 'SET_GAME_VIEW';

export function setGameView(gameView) {
  return { type: SET_GAME_VIEW, payload: gameView };
}

export const CREATE_NEW_GAME = 'CREATE_NEW_GAME';

export function createNewGame(clientId) {
  return { type: CREATE_NEW_GAME, payload: clientId };
}

export const START_PLAYER_GAME = 'START_PLAYER_GAME';

export function startPlayerGame(game) {
  return { type: START_PLAYER_GAME, payload: game };
}

export default {
  SET_ONLINE_PLAYERS,
  SET_GAME_VIEW,
  CREATE_NEW_GAME,
  START_PLAYER_GAME
};
