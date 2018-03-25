import express from 'express';
import socketIO from 'socket.io';

import ConnectionHandler from './handlers/ConnectionHandler';
import GameHandler from './handlers/GameHandler';
import uiActionTypes from './ui-action-types';

const port = process.env.PORT || 80;
const wsPort = process.env.WS_PORT || 4000;

const app = express();
const io = socketIO(wsPort);

app.use(express.static(`${__dirname}/ui`));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Socket.IO server listening on port ${wsPort}`);
});

const games = {};
const connectionHandler = new ConnectionHandler(io, games);

io.on('connection', client => {
  connectionHandler.connectPlayer(client.id);
  client.emit(uiActionTypes.SET_GAME_VIEW, 'ACTION_BOARD');

  const gameHandler = new GameHandler(io, client, games, connectionHandler);
  gameHandler.updateGameListForAll();

  client.on('disconnect', () => {
    connectionHandler.disconnectPlayer(client.id);
    gameHandler.updateGameForRoom();
  });

  client.on('setUsername', username => {
    connectionHandler.setUsername(client.id, username);
  });

  client.on('doReconnect', ({ clientId, gameId, checkOnly }) => {
    const reconnectAllowed = connectionHandler.reconnectPlayer(
      client.id,
      clientId,
      gameId,
      checkOnly
    );

    if (reconnectAllowed && !checkOnly) {
      gameHandler.playerHasJoinedGame(gameId);
    }
  });

  client.on('abortReconnect', ({ clientId }) => {
    connectionHandler.disconnectPlayer(clientId, true);
  });

  client.on('newGame', () => {
    gameHandler.createGame();
  });

  client.on('joinGame', gameId => {
    gameHandler.joinGame(gameId);
  });

  client.on('stackClick', stackId => {
    gameHandler.stackClick(stackId);
  });
});
