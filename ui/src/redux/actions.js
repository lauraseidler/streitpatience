export const SET_ONLINE_PLAYERS = 'SET_ONLINE_PLAYERS';

export function setOnlinePlayers(onlinePlayers) {
  return { type: SET_ONLINE_PLAYERS, payload: onlinePlayers };
}

export const SET_GAME_VIEW = 'SET_GAME_VIEW';

export function setGameView(gameView) {
  return { type: SET_GAME_VIEW, payload: gameView };
}

export default {
  SET_ONLINE_PLAYERS,
  SET_GAME_VIEW
};
