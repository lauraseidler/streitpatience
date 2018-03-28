import openSocket from 'socket.io-client';
import sha256 from 'js-sha256';

import actionTypes from './redux/action-types';
import { setGameView } from './redux/actions';
import store from './redux/store';
import { GAME_VIEWS } from './variables';

const socket = openSocket(
  `http://${window.location.hostname}:${process.env.WS_PORT || 4000}`
);

let prevClientId;
let prevGameId;

const init = () => {
  Object.keys(actionTypes).forEach(type =>
    socket.on(type, payload => store.dispatch({ type, payload }))
  );
};

const emit = (type, payload) => socket.emit(type, payload);

const getId = () => socket.id;

const getPlayerId = () => sha256(getId());

const doReconnect = (checkOnly = false) => {
  if (!prevClientId || !prevGameId) {
    return;
  }

  emit('doReconnect', {
    clientId: prevClientId,
    gameId: prevGameId,
    checkOnly
  });
};

const abortReconnect = () => {
  store.dispatch(setGameView(GAME_VIEWS.ACTION_BOARD));

  if (!prevClientId || !prevGameId) {
    return;
  }

  emit('abortReconnect', {
    clientId: prevClientId,
    gameId: prevGameId
  });
};

socket.on('connect', () => {
  if (typeof localStorage !== 'undefined') {
    prevClientId = localStorage.getItem('clientId');
    prevGameId = localStorage.getItem('gameId');

    const username =
      localStorage.getItem('username') ||
      `user${Math.floor(Math.random() * 1000000)}`;

    emit('setUsername', username);
  }

  doReconnect(true);
});

export default {
  init,
  emit,
  getId,
  getPlayerId,
  doReconnect,
  abortReconnect
};
