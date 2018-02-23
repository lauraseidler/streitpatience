import openSocket from 'socket.io-client';

const socket = openSocket(`http://localhost:${process.env.WS_PORT || 4000}`);

function subscribeToTimer(interval, cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', interval);
}

export { subscribeToTimer };
