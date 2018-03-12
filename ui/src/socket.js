import openSocket from 'socket.io-client';

import actions from './redux/actions';

const socket = openSocket(`http://localhost:${process.env.WS_PORT || 4000}`);

const init = store => {
  Object.keys(actions).forEach(type =>
    socket.on(type, payload => store.dispatch({ type, payload }))
  );
};

const emit = (type, payload) => socket.emit(type, payload);

const disconnect = () => {
  emit('disconnect');
};

const newGame = () => {
  emit('newGame');
};

const getID = () => socket.id;

export default {
  init,
  emit,
  disconnect,
  newGame,
  getID
};
