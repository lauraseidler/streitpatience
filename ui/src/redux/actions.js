import {
  ABORT_RECONNECT,
  PROMPT_RECONNECT,
  REMOVE_ERROR_MESSAGE,
  SET_CURRENT_GAME,
  SET_ERROR_MESSAGE,
  SET_GAME_VIEW,
  SET_GAMES,
  SET_ONLINE_PLAYERS,
  SET_USERNAME
} from './action-types';

export function abortReconnect() {
  return { type: ABORT_RECONNECT };
}

export function promptReconnect() {
  return { type: PROMPT_RECONNECT };
}

export function removeErrorMessage() {
  return { type: REMOVE_ERROR_MESSAGE };
}

export function setCurrentGame(game) {
  return { type: SET_CURRENT_GAME, payload: game };
}

export function setErrorMessage(message) {
  return { type: SET_ERROR_MESSAGE, payload: message };
}

export function setGameView(gameView) {
  return { type: SET_GAME_VIEW, payload: gameView };
}

export function setGames(games) {
  return { type: SET_GAMES, payload: games };
}

export function setOnlinePlayers(onlinePlayers) {
  return { type: SET_ONLINE_PLAYERS, payload: onlinePlayers };
}

export function setUsername(username) {
  return { type: SET_USERNAME, payload: username };
}
