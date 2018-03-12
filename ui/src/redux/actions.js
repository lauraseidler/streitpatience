export const SET_ONLINE_PLAYERS = 'SET_ONLINE_PLAYERS';

export function setOnlinePlayers(onlinePlayers) {
  return { type: SET_ONLINE_PLAYERS, payload: onlinePlayers };
}

export const SET_GAME_VIEW = 'SET_GAME_VIEW';

export function setGameView(gameView) {
  return { type: SET_GAME_VIEW, payload: gameView };
}

export const CREATE_NEW_GAME = 'CREATE_NEW_GAME';

export function createNewGame(gameId, playerId) {
  return { type: CREATE_NEW_GAME, payload: { gameId, playerId } };
}

export const SET_PLAYER_GAME = 'SET_PLAYER_GAME';

export function setPlayerGame(game) {
  return { type: SET_PLAYER_GAME, payload: game };
}

export const PROMPT_RECONNECT = 'PROMPT_RECONNECT';

export function promptReconnect() {
  return { type: PROMPT_RECONNECT };
}

export const RECONNECT_PLAYER = 'RECONNECT_PLAYER';

export function reconnectPlayer(gameId, playerId, newPlayerId) {
  return { type: RECONNECT_PLAYER, payload: { gameId, playerId, newPlayerId } };
}

export const ABORT_RECONNECT = 'ABORT_RECONNECT';

export function abortReconnect() {
  return { type: ABORT_RECONNECT };
}

export default {
  SET_ONLINE_PLAYERS,
  SET_GAME_VIEW,
  CREATE_NEW_GAME,
  SET_PLAYER_GAME,
  PROMPT_RECONNECT
};
