import express from 'express';
import sha256 from 'js-sha256';
import socketIO from 'socket.io';

import {
  setOnlinePlayers,
  createNewGame,
  reconnectPlayer,
  addPlayer
} from './redux/actions';
import store from './redux/store';
import uiActionTypes from './ui-action-types.js';

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

  io.sockets.emit(
    uiActionTypes.SET_ONLINE_PLAYERS,
    store.getState().onlinePlayers
  );

  client.emit(uiActionTypes.SET_GAMES, store.getState().games);

  client.on('disconnect', () => {
    store.dispatch(setOnlinePlayers(store.getState().onlinePlayers - 1));

    io.sockets.emit(
      uiActionTypes.SET_ONLINE_PLAYERS,
      store.getState().onlinePlayers
    );
  });

  client.on('newGame', () => {
    // unique gameId from timestamp and client ID
    const gameId = sha256(Date.now() + client.id);

    // hashed player ID from client ID
    const playerId = sha256(client.id);

    store.dispatch(createNewGame(gameId, playerId));

    client.join(gameId);

    client.emit(
      uiActionTypes.SET_CURRENT_GAME,
      store.getState().gameDetails[gameId]
    );

    io.sockets.emit(uiActionTypes.SET_GAMES, store.getState().games);
  });

  client.on('joinGame', gameId => {
    let game = store.getState().gameDetails[gameId];

    if (!game) {
      return;
    }

    const playerId = sha256(client.id);

    store.dispatch(addPlayer(gameId, playerId));

    game = store.getState().gameDetails[gameId];

    if (game.players.indexOf(playerId) > -1) {
      client.join(gameId);

      io
        .to(gameId)
        .emit(
          uiActionTypes.SET_CURRENT_GAME,
          store.getState().gameDetails[gameId]
        );

      io.sockets.emit(uiActionTypes.SET_GAMES, store.getState().games);
    }
  });

  client.on('checkToReconnect', ({ gameId, clientId }) => {
    const playerId = sha256(clientId);

    const prevGame = store.getState().gameDetails[gameId];

    if (prevGame && prevGame.players.indexOf(playerId) > -1) {
      client.emit(uiActionTypes.PROMPT_RECONNECT);
    }
  });

  client.on('reconnectPlayer', ({ gameId, clientId }) => {
    const playerId = sha256(clientId);

    const prevGame = store.getState().gameDetails[gameId];

    if (prevGame && prevGame.players.indexOf(playerId) > -1) {
      const newPlayerId = sha256(client.id);

      store.dispatch(reconnectPlayer(gameId, playerId, newPlayerId));

      client.join(gameId);

      io
        .to(gameId)
        .emit(
          uiActionTypes.SET_CURRENT_GAME,
          store.getState().gameDetails[gameId]
        );
    }
  });
});
