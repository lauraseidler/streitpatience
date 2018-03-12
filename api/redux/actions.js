import {
  SET_ONLINE_PLAYERS,
  CREATE_NEW_GAME,
  RECONNECT_PLAYER
} from './action-types';

export function setOnlinePlayers(onlinePlayers) {
  return { type: SET_ONLINE_PLAYERS, payload: onlinePlayers };
}

export function createNewGame(gameId, playerId) {
  return { type: CREATE_NEW_GAME, payload: { gameId, playerId } };
}

export function reconnectPlayer(gameId, playerId, newPlayerId) {
  return { type: RECONNECT_PLAYER, payload: { gameId, playerId, newPlayerId } };
}
