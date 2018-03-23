import {
  SET_ONLINE_PLAYERS,
  SET_GAME_VIEW,
  SET_CURRENT_GAME,
  PROMPT_RECONNECT,
  ABORT_RECONNECT,
  SET_GAMES,
  SET_USERNAME,
  SET_ACTIVE_STACK
} from './action-types';

export function setOnlinePlayers(onlinePlayers) {
  return { type: SET_ONLINE_PLAYERS, payload: onlinePlayers };
}

export function setGameView(gameView) {
  return { type: SET_GAME_VIEW, payload: gameView };
}

export function setCurrentGame(game) {
  return { type: SET_CURRENT_GAME, payload: game };
}

export function promptReconnect() {
  return { type: PROMPT_RECONNECT };
}

export function abortReconnect() {
  return { type: ABORT_RECONNECT };
}

export function setGames(games) {
  return { type: SET_GAMES, payload: games };
}

export function setUsername(username) {
  return { type: SET_USERNAME, payload: username };
}

export function setActiveStack(stackId) {
  return { type: SET_ACTIVE_STACK, payload: stackId };
}
