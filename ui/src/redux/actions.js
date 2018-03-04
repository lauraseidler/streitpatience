export const SET_ONLINE_PLAYERS = 'SET_ONLINE_PLAYERS';

export function setOnlinePlayers(onlinePlayers) {
  return { type: SET_ONLINE_PLAYERS, payload: onlinePlayers };
}

export default {
  SET_ONLINE_PLAYERS
};
