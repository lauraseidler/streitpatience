import { sha256 } from 'js-sha256';

import Player from '../game-objects/Player';
import uiActionTypes from '../ui-action-types';

/**
 * Handler for socket connections.
 */
class ConnectionHandler {
  /**
   * Socket.IO server instance.
   *
   * @type {SocketIO.Server}
   */
  io = null;

  /**
   * Currently running games.
   *
   * @type {Object.<string, Game>}
   */
  games = {};

  /**
   * Currently online players.
   *
   * @type {Object}
   */
  players = {};

  /**
   * Disconnect timeouts.
   *
   * @type {Object}
   */
  disconnectTimeouts = {};

  /**
   * Create a new handler.
   *
   * @param {SocketIO.Server}       io    Socket.IO server instance
   * @param {Object.<string, Game>} games Currently running games
   */
  constructor(io, games) {
    this.io = io;
    this.games = games;
  }

  /**
   * Record connecting player.
   *
   * @param {string} id Socket.IO client ID of new player
   */
  connectPlayer(id) {
    const playerId = this._generatePlayerId(id);

    this.players[playerId] = new Player(playerId, id);

    this._emitOnlinePlayers();
  }

  /**
   * Record disconnecting player.
   *
   * @param {string} id     Socket.IO client ID of disconnecting player
   * @param {bool}  [final] Whether the disconnect is final
   */
  disconnectPlayer(id, final = false) {
    const playerId = this._generatePlayerId(id);

    if (!this.players[playerId]) {
      return;
    }

    const gameId = this.players[playerId].gameId;
    const game = gameId ? this.games[gameId] : null;

    if (!game || game.players.length < 2 || final) {
      if (game) {
        this.io.to(gameId).emit(uiActionTypes.SET_GAME_VIEW, 'ACTION_BOARD');
        delete this.games[gameId];
      }

      delete this.players[playerId];
      delete this.disconnectTimeouts[playerId];
    } else {
      this.players[playerId].online = false;
      this._setFinalDisconnectTimeout(id, playerId);
    }

    this._emitOnlinePlayers();
  }

  /**
   * Record reconnecting player.
   *
   * @param {string} id           Socket.IO client ID of reconnecting player
   * @param {string} oldPlayerId  Old unique player ID
   * @param {bool}   [checkOnly]  Whether to only perform a reconnect check
   */
  reconnectPlayer(id, oldClientId, oldGameId, checkOnly = false) {
    const oldPlayerId = this._generatePlayerId(oldClientId);

    if (
      !this.players[oldPlayerId] ||
      this.players[oldPlayerId].gameId !== oldGameId
    ) {
      return false;
    }

    if (checkOnly) {
      // reset disconnect timeout
      this._setFinalDisconnectTimeout(
        this.players[oldPlayerId].clientId,
        oldPlayerId
      );

      this.io.to(id).emit(uiActionTypes.PROMPT_RECONNECT);

      return true;
    }

    const playerId = this._generatePlayerId(id);

    this.players[playerId].cardsPlayed = this.players[oldPlayerId].cardsPlayed;
    this.players[playerId].gameId = this.players[oldPlayerId].gameId;
    this.players[oldPlayerId].gameId = null;

    this.games[this.players[playerId].gameId].replacePlayer(
      this.players[oldPlayerId],
      this.players[playerId]
    );

    this.disconnectPlayer(oldClientId, true);

    return true;
  }

  /**
   * Set username for Socket.IO client.
   *
   * @param {string} id Socket.IO client ID
   * @param {string} username New username to set
   */
  setUsername(id, username) {
    const playerId = this._generatePlayerId(id);

    if (this.players[playerId]) {
      this.players[playerId].username = username;
      this.io.to(id).emit(uiActionTypes.SET_USERNAME, username);
    }
  }

  /**
   * Set game ID for player.
   *
   * @param {string} playerId Unique player identifier
   * @param {string} gameId Unique game identifier
   */
  setGameId(playerId, gameId) {
    if (this.players[playerId]) {
      this.players[playerId].setGameId(gameId);
    }
  }

  /**
   * Return info for player by ID.
   *
   * @param {string} playerId Unique player identifier
   * @returns {Player}
   */
  getPlayerInfo(playerId) {
    return this.players[playerId];
  }

  /**
   * Generate a new unique player ID.
   *
   * @param {string} clientId Socket.IO client ID
   * @returns {string}
   */
  _generatePlayerId(clientId) {
    return sha256(clientId);
  }

  /**
   * Set timeout for final player disconnect.
   *
   * @param {string} clientId Socket.IO client ID
   * @param {string} playerId Unique player ID
   */
  _setFinalDisconnectTimeout(clientId, playerId) {
    if (this.disconnectTimeouts[playerId]) {
      clearTimeout(this.disconnectTimeouts[playerId]);
    }

    this.disconnectTimeouts[playerId] = setTimeout(() => {
      this.disconnectPlayer(clientId, true);
    }, 1000 * 60 * 5);
  }

  /**
   * Emit online players to clients.
   */
  _emitOnlinePlayers() {
    this.io.sockets.emit(
      uiActionTypes.SET_ONLINE_PLAYERS,
      Object.values(this.players).filter(p => p.online).length
    );
  }
}

export default ConnectionHandler;
