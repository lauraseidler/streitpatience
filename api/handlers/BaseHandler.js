import { sha256 } from 'js-sha256';
import store from '../redux/store';
import uiActionTypes from '../ui-action-types';

class BaseHandler {
  constructor(io, client) {
    this.io = io;
    this.client = client;
  }

  _setPlayerAndGameId() {
    this.playerId = this._generatePlayerId();

    if (this._isPlayerInAnyGame()) {
      this.gameId = this._getPlayerGame().id;
    }
  }

  _generatePlayerId(clientId) {
    return sha256(clientId || this.client.id);
  }

  _getPlayerGame() {
    return Object.values(store.getState().gameDetails).find(
      g => g.players.map(p => p.id).indexOf(this.playerId) > -1
    );
  }

  _isPlayerInAnyGame() {
    return !!this._getPlayerGame();
  }

  _updateGameForRoom() {
    this.io
      .to(this.gameId)
      .emit(
        uiActionTypes.SET_CURRENT_GAME,
        store.getState().gameDetails[this.gameId]
      );
  }
}

export default BaseHandler;
