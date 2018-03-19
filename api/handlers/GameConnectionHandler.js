import { sha256 } from 'js-sha256';

import BaseHandler from './BaseHandler';
import {
  createNewGame,
  addPlayer,
  reconnectPlayer,
  disconnectPlayer,
  initGame
} from '../redux/actions';
import store from '../redux/store';
import uiActionTypes from '../ui-action-types';

class GameConnectionHandler extends BaseHandler {
  newGame(username) {
    this.playerId = this._generatePlayerId();

    // don't let players create more than one game
    if (this._isPlayerInAnyGame()) {
      return;
    }

    this.gameId = this._generateGameId();

    store.dispatch(createNewGame(this.gameId, this.playerId, username));

    this._joinGameRoom();
    this._updateGameForRoom();
    this._updateGameListForAll();
  }

  joinGame({ gameId, username }) {
    this.playerId = this._generatePlayerId();

    // don't let players be in more than one game
    if (this._isPlayerInAnyGame()) {
      return;
    }

    this.gameId = gameId;

    store.dispatch(addPlayer(this.gameId, this.playerId, username));

    // reset if for some reason player could not be added to game
    // TODO: should probably send an error message here...
    if (!this._isPlayerInCorrectGame()) {
      this.gameId = null;
      return;
    }

    store.dispatch(initGame(this.gameId));

    this._joinGameRoom();
    this._updateGameForRoom();
    this._updateGameListForAll();
  }

  reconnectGame({ gameId, clientId, checkOnly = false }) {
    this.playerId = this._generatePlayerId(clientId);
    this.gameId = gameId;

    if (!this._isPlayerInCorrectGame()) {
      return;
    }

    if (checkOnly) {
      this.client.emit(uiActionTypes.PROMPT_RECONNECT);
      return;
    }

    const oldPlayerId = this.playerId;
    this.playerId = this._generatePlayerId();

    store.dispatch(reconnectPlayer(this.gameId, oldPlayerId, this.playerId));

    this._joinGameRoom();
    this._updateGameForRoom();
  }

  cleanUpGame() {
    this._setPlayerAndGameId();

    if (!this._isPlayerInAnyGame()) {
      return;
    }

    store.dispatch(disconnectPlayer(this.gameId, this.playerId));

    // if player game has been removed, just send a new list of games to all players
    if (!this._isPlayerInAnyGame()) {
      this._updateGameListForAll();
      return;
    }

    this._updateGameForRoom();
  }

  _generateGameId() {
    return sha256(Date.now() + this.client.id);
  }

  _isPlayerInCorrectGame() {
    const game = store.getState().gameDetails[this.gameId];

    if (!game) {
      return false;
    }

    return game.players.map(p => p.id).indexOf(this.playerId) > -1;
  }

  _joinGameRoom() {
    this.client.join(this.gameId);
  }

  _updateGameListForAll() {
    this.io.sockets.emit(uiActionTypes.SET_GAMES, store.getState().games);
  }
}

export default GameConnectionHandler;
