import { sha256 } from 'js-sha256';

import { STACK_TYPES } from '../game-objects/constants';
import Game from '../game-objects/Game';
import uiActionTypes from '../ui-action-types';

/**
 * Handler for game events.
 */
class GameHandler {
  /**
   * Socket.IO server instance.
   *
   * @type {SocketIO.Server}
   */
  io = null;

  /**
   * Socket.IO client instance.
   *
   * @type {SocketIO.Client}
   */
  client = null;

  /**
   * Currently running games on server.
   *
   * @type {Object.<string, Game>}
   */
  games = {};

  /**
   * Connection handler.
   *
   * @type {ConnectionHandler}
   */
  handler = null;

  /**
   * Unique player identifier.
   *
   * @type {string}
   */
  playerId = null;

  /**
   * Connection info for player.
   *
   * @type {Player}
   */
  playerInfo = null;

  /**
   * Player game, if player is in any game.
   *
   * @type {Game}
   */
  playerGame = null;

  /**
   * Create a new handler.
   *
   * @param {SocketIO.Server}       io      Socket.IO server instance
   * @param {SocketIO.Client}       client  Socket.IO client instance
   * @param {Object.<string, Game>} games   Currently running games on server
   * @param {ConnectionHandler}     handler Connection handler
   */
  constructor(io, client, games, handler) {
    this.io = io;
    this.client = client;
    this.games = games;
    this.handler = handler;

    this._setPlayerDetails();
  }

  /**
   * Create a new game.
   */
  createGame() {
    // don't let players be in more than one game
    if (this._isPlayerInGame()) {
      return;
    }

    const game = new Game(`Game by ${this.playerInfo.username}`);
    game.addPlayer(this.playerInfo);

    this.games[game.id] = game;

    this.playerHasJoinedGame(game.id);
  }

  /**
   * Join game with given ID.
   *
   * @param {string} gameId Unique game identifier
   */
  joinGame(gameId) {
    // don't let players be in more than one game
    if (this._isPlayerInGame()) {
      return;
    }

    const game = this.games[gameId];
    const playerAdded = game.addPlayer(this.playerInfo);

    if (!playerAdded) {
      // TODO: should probably send an error message
      return;
    }

    game.init();

    this.playerHasJoinedGame(game.id);
  }

  /**
   * Handle click on a stack.
   *
   * @param {string} stackId Unique stack identifier
   */
  stackClick(stackId) {
    if (!this._isPlayerInGame()) {
      return;
    }

    if (!this._isPlayerTurn()) {
      this._sendError(`It's not your turn!`);
      return;
    }

    const activeStack = this.playerGame.getActiveStack();
    const clickedStack = this.playerGame.getStackById(stackId);

    if (!activeStack) {
      if (
        this.playerInfo.cardsPlayed < 4 &&
        (!clickedStack.isPlayerStack(this.playerId) ||
          clickedStack.type !== STACK_TYPES.DRAW)
      ) {
        this._sendError(
          `You must play your first four cards from the draw pile!`
        );
        return;
      }

      if (clickedStack.isOpponentStack(this.playerId)) {
        this._sendError(`You can't take cards from your opponent's stacks!`);
        return;
      }

      if (!clickedStack.canPickUpCard()) {
        this._sendError(`You can't play cards from this pile!`);
        return;
      }

      if (clickedStack.cards.length < 1) {
        if (
          !clickedStack.isPlayerStack(this.playerId) ||
          !this.playerGame.hasCardsOnDiscardPile(this.playerId) ||
          clickedStack.type !== STACK_TYPES.DRAW
        ) {
          this._sendError(`There's no cards on this stack!`);
          return;
        }

        this.playerGame.refillDrawStack(this.playerId);
      }

      clickedStack.isActive = true;
      this.updateGameForRoom();
      return;
    }

    if (activeStack.id === clickedStack.id) {
      if (!clickedStack.canPutCardBack()) {
        this._sendError(`You can't put this card back down!`);
        return;
      }

      clickedStack.isActive = false;
      this.updateGameForRoom();
      return;
    }

    if (
      activeStack.type === STACK_TYPES.MAIN &&
      clickedStack.isPlayerStack(this.playerId)
    ) {
      this._sendError(`You can't put this card here!`);
      return;
    }

    if (
      clickedStack.isOpponentStack(this.playerId) &&
      !clickedStack.canOpponentPutCard()
    ) {
      this._sendError(`You can't put this card here!`);
      return;
    }

    if (
      clickedStack.isPlayerStack(this.playerId) &&
      clickedStack.type === STACK_TYPES.MAIN
    ) {
      this._sendError(`You don't really want to place this card here...`);
      return;
    }

    if (activeStack.isCommunalStack() && !clickedStack.isCommunalStack()) {
      this._sendError(
        `You can't play cards from communal stacks onto player stacks!`
      );
      return;
    }

    if (!clickedStack.cardAllowed(activeStack.cards[0], this.playerId)) {
      this._sendError(`This card doesn't fit here!`);
      return;
    }

    if (
      clickedStack.type === STACK_TYPES.STOCK &&
      !clickedStack.cards.length &&
      this.playerGame.limitedStockStacks &&
      this.playerGame.numberOfStockStacksFilled() === 4
    ) {
      this._sendError(
        `You can only use four stock stacks during your first turn!`
      );
      return;
    }

    if (
      clickedStack.isOpponentStack(this.playerId) &&
      this.playerGame.cardAllowedOnCommunalStack(activeStack.cards[0])
    ) {
      this._sendError(
        `You must play this card onto the fitting communal stack!`
      );
      return;
    }

    this.playerInfo.recordCardPlayed();
    clickedStack.addCard(activeStack.removeCard());
    activeStack.isActive = false;

    if (this.playerGame.hasPlayerWon(this.playerId)) {
      this.playerGame.winner = this.playerId;
    } else if (
      clickedStack.type === STACK_TYPES.DISCARD &&
      clickedStack.isPlayerStack(this.playerId)
    ) {
      this.playerGame.switchPlayer();
    }

    this.updateGameForRoom();
    return;
  }

  /**
   * Send an update event to all clients with the game list.
   */
  updateGameListForAll() {
    const gameList = Object.values(this.games)
      .filter(game => game.players.length === 1)
      .map(game => ({
        id: game.id,
        name: game.name
      }));

    this.io.sockets.emit(uiActionTypes.SET_GAMES, gameList);
  }

  /**
   * Take necessary steps after player has joined game.
   *
   * @param {string} gameId Unique game identifier
   */
  playerHasJoinedGame(gameId) {
    this.handler.setGameId(this.playerId, gameId);

    this._setPlayerGame();
    this._joinGameRoom();
    this.updateGameForRoom();
    this.updateGameListForAll();
  }

  /**
   * Send an update event to the client with the current game details.
   */
  updateGameForRoom() {
    if (this.playerGame) {
      this.io
        .to(this.playerGame.id)
        .emit(uiActionTypes.SET_CURRENT_GAME, this.games[this.playerGame.id]);
    }
  }

  /**
   * Set player ID from Socket.IO client
   */
  _setPlayerDetails() {
    this.playerId = sha256(this.client.id);
    this.playerInfo = this.handler.getPlayerInfo(this.playerId);
  }

  /**
   * Find and set player game from games collection if not set.
   *
   * @param {bool} [force] Whether to force reset of player game
   */
  _setPlayerGame(force) {
    if ((this.playerGame && !force) || !this.playerInfo.gameId) {
      return;
    }

    this.playerGame = this.games[this.playerInfo.gameId];
  }

  /**
   * Whether the current player currently in a game.
   */
  _isPlayerInGame() {
    this._setPlayerGame();

    return this.playerGame !== null;
  }

  /**
   * Add client to game room
   */
  _joinGameRoom() {
    this.client.join(this.playerGame.id);
  }

  /**
   * Whether it is the player's turn.
   *
   * @returns {bool}
   */
  _isPlayerTurn() {
    return this.playerGame.currentPlayerId === this.playerId;
  }

  /**
   * Send an error message to the client.
   *
   * @param {string} message Error message
   */
  _sendError(message) {
    this.client.emit(uiActionTypes.SET_ERROR_MESSAGE, message);
  }
}

export default GameHandler;
