import express from 'express';
import socketIO from 'socket.io';

import actions, { setOnlinePlayers } from '../redux/actions';
import store from '../redux/store';

const port = process.env.PORT || 80;
const wsPort = process.env.WS_PORT || 4000;

const app = express();
const io = socketIO(wsPort);

app.use(express.static(`${__dirname}/ui`));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Socket.IO server listening on port ${wsPort}`);
});

io.on('connection', client => {
  store.dispatch(setOnlinePlayers(store.getState().onlinePlayers + 1));
  io.sockets.emit(actions.SET_ONLINE_PLAYERS, store.getState().onlinePlayers);

  client.on('disconnect', () => {
    store.dispatch(setOnlinePlayers(store.getState().onlinePlayers - 1));
    io.sockets.emit(actions.SET_ONLINE_PLAYERS, store.getState().onlinePlayers);
  });
});
