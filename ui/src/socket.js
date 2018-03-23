import openSocket from 'socket.io-client';
import sha256 from 'js-sha256';

import actionTypes from './redux/action-types';
import store from './redux/store';

const socket = openSocket(`http://localhost:${process.env.WS_PORT || 4000}`);

let prevSocketClientId;
let prevGameId;

const init = () => {
  Object.keys(actionTypes).forEach(type =>
    socket.on(type, payload => store.dispatch({ type, payload }))
  );
};

const emit = (type, payload) => socket.emit(type, payload);

const disconnect = () => {
  emit('disconnect');
};

const newGame = () => {
  emit('newGame', store.getState().username);
};

const joinGame = gameId => {
  emit('joinGame', { gameId, username: store.getState().username });
};

const getId = () => socket.id;

const getPlayerId = () => sha256(getId());

const reconnect = () => {
  if (!prevSocketClientId || !prevGameId) {
    return;
  }

  socket.emit('reconnectGame', {
    gameId: prevGameId,
    clientId: prevSocketClientId
  });
};

socket.on('connect', () => {
  if (typeof localStorage !== 'undefined') {
    prevSocketClientId = localStorage.getItem('socketClientId');
    prevGameId = localStorage.getItem('gameId');
  }

  if (!prevSocketClientId || !prevGameId) {
    return;
  }

  emit('reconnectGame', {
    gameId: prevGameId,
    clientId: prevSocketClientId,
    checkOnly: true
  });
});

export default {
  init,
  emit,
  disconnect,
  newGame,
  joinGame,
  getId,
  getPlayerId,
  reconnect
};
