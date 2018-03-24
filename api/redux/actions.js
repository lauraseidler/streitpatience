import {
  SET_ONLINE_PLAYERS,
  CREATE_NEW_GAME,
  RECONNECT_PLAYER,
  ADD_PLAYER,
  DISCONNECT_PLAYER,
  INIT_GAME,
  SET_ACTIVE_STACK,
  MOVE_CARD,
  SWITCH_PLAYER
} from './action-types';

export function setOnlinePlayers(onlinePlayers) {
  return { type: SET_ONLINE_PLAYERS, payload: onlinePlayers };
}

export function createNewGame(gameId, playerId, username) {
  return { type: CREATE_NEW_GAME, payload: { gameId, playerId, username } };
}

export function reconnectPlayer(gameId, playerId, newPlayerId) {
  return { type: RECONNECT_PLAYER, payload: { gameId, playerId, newPlayerId } };
}

export function addPlayer(gameId, playerId, username) {
  return { type: ADD_PLAYER, payload: { gameId, playerId, username } };
}

export function disconnectPlayer(gameId, playerId) {
  return { type: DISCONNECT_PLAYER, payload: { gameId, playerId } };
}

export function initGame(gameId) {
  return { type: INIT_GAME, payload: gameId };
}

export function setActiveStack(gameId, stackId) {
  return { type: SET_ACTIVE_STACK, payload: { gameId, stackId } };
}

export function moveCard(gameId, fromStackId, toStackId) {
  return { type: MOVE_CARD, payload: { gameId, fromStackId, toStackId } };
}

export function switchPlayer(gameId) {
  return { type: SWITCH_PLAYER, payload: gameId };
}
