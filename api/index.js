import express from 'express';
import sha256 from 'js-sha256';
import socketIO from 'socket.io';

import GameConnectionHandler from './handlers/GameConnectionHandler';
import {
  setOnlinePlayers,
  createNewGame,
  reconnectPlayer,
  addPlayer
} from './redux/actions';
import store from './redux/store';
import uiActionTypes from './ui-action-types.js';
import GamePlayHandler from './handlers/GamePlayHandler';

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
  const gch = new GameConnectionHandler(io, client);
  const gph = new GamePlayHandler(io, client);

  store.dispatch(setOnlinePlayers(store.getState().onlinePlayers + 1));

  io.sockets.emit(
    uiActionTypes.SET_ONLINE_PLAYERS,
    store.getState().onlinePlayers
  );

  client.emit(uiActionTypes.SET_GAMES, store.getState().games);

  client.on('disconnect', () => {
    gch.cleanUpGame();
    store.dispatch(setOnlinePlayers(store.getState().onlinePlayers - 1));

    io.sockets.emit(
      uiActionTypes.SET_ONLINE_PLAYERS,
      store.getState().onlinePlayers
    );
  });

  client.on('newGame', gch.newGame.bind(gch));

  client.on('joinGame', gch.joinGame.bind(gch));

  client.on('reconnectGame', gch.reconnectGame.bind(gch));

  client.on('stackClick', gph.stackClick.bind(gph));
});
