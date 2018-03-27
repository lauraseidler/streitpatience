import { sha256 } from 'js-sha256';

import Card from './Card';
import { STACK_TYPES, SUITS, RANKS } from './constants';
import Stack from './Stack';

/**
 * Shuffle array in place.
 * @param {Array} a An array containing the items.
 */
function shuffle(a) {
  let j, x, i;

  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
}

class Game {
  /**
   * Unique game identifier.
   *
   * @type {string}
   */
  id = null;

  /**
   * Game name.
   *
   * @type {string}
   */
  name = null;

  /**
   * Players in game.
   *
   * @type {Array<Object>}
   */
  players = [];

  /**
   * Player ID of current player.
   *
   * @type {string}
   */
  currentPlayerId = null;

  /**
   * Game stacks
   *
   * @type {Array<Stack>}
   */
  stacks = [];

  /**
   * Whether the stock stacks are limited to play (very first turn)
   *
   * @type {bool}
   */
  limitedStockStacks = true;

  /**
   * Winner of the game (unique player ID)
   *
   * @type {string}
   */
  winner = null;

  /**
   * Create new game.
   *
   * @param {string} name Game name
   * @param {array} players Array of players
   */
  constructor(name) {
    this.id = sha256(Date.now() + name);
    this.name = name;
  }

  /**
   * Add player to game.
   *
   * @param {Player} player Player info
   * @returns {bool} Whether player has been added successfully
   */
  addPlayer(player) {
    if (this.players.length > 1) {
      return false;
    }

    this.players.push(player);

    return true;
  }

  /**
   * Replace a player in a game with a different player.
   *
   * @param {Player} oldPlayer Player to replace
   * @param {Player} newPlayer Player replacing old player
   */
  replacePlayer(oldPlayer, newPlayer) {
    this.players = this.players.map(
      p => (p.id === oldPlayer.id ? newPlayer : p)
    );

    if (this.currentPlayerId === oldPlayer.id) {
      this.currentPlayerId = newPlayer.id;
    }

    if (this.winner === oldPlayer.id) {
      this.winner === newPlayer.id;
    }

    this.stacks.forEach(stack => {
      if (stack.player == oldPlayer.id) {
        stack.player = newPlayer.id;
      }
    });
  }

  /**
   * Initialise game.
   */
  init() {
    this.currentPlayerId = this.players[Math.round(Math.random())].id;

    this._createStacks();
    this._initStacks();
  }

  /**
   * Find stack by stackId.
   *
   * @param {string} stackId Unique stack identifier
   * @returns {Stack}
   */
  getStackById(stackId) {
    return this.stacks.find(s => s.id === stackId);
  }

  /**
   * Find active stack.
   *
   * @returns {Stack}
   */
  getActiveStack() {
    return this.stacks.find(s => s.isActive);
  }

  /**
   * Set stack with stackId as active or inactive,
   * dependent on current state and stack configuration.
   *
   * @param {string} stackId Unique stack identifier
   * @returns {bool}
   */
  setActiveStack(stackId) {
    const activeStack = this.getActiveStack();

    if (activeStack.id === stackId) {
      if (!activeStack.canPutCardBack()) {
        return false;
      }

      activeStack.setActiveState(false);
      return true;
    }

    const newActiveStack = this.getStackById(stackId);

    if (newActiveStack.canPickCardUp()) {
      newActiveStack.setActiveState(true);
      return true;
    }

    return false;
  }

  /**
   * Switch currently active player.
   */
  switchPlayer() {
    this.currentPlayerId = this.players.find(
      p => p.id !== this.currentPlayerId
    ).id;

    this.limitedStockStacks = false;
  }

  /**
   * The number of stock stacks that have cards in them.
   *
   * @returns {bool}
   */
  numberOfStockStacksFilled() {
    let number = 0;

    for (let i = 8; i < 16; i++) {
      if (this.stacks[i].cards.length) {
        number++;
      }
    }

    return number;
  }

  /**
   * Whether a given card could be placed onto a communal stack
   *
   * @param {Card} card Card to play
   * @returns {bool}
   */
  cardAllowedOnCommunalStack(card) {
    return (
      this.cardAllowedOnFamilyStack(card) || this.cardAllowedOnStockStack(card)
    );
  }

  /**
   * Whether a given card could be placed onto a family stack
   *
   * @param {Card} card Card to play
   * @returns {bool}
   */
  cardAllowedOnFamilyStack(card) {
    for (let i = 0; i < 8; i++) {
      if (this.stacks[i].cardAllowed(card)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Whether a given card could be placed onto a stock stack
   *
   * @param {Card} card Card to play
   * @returns {bool}
   */
  cardAllowedOnStockStack(card) {
    let number;

    for (let i = 8; i < 16; i++) {
      if (this.stacks[i].cardAllowed(card)) {
        number++;

        if (!this.limitedStockStacks) {
          return true;
        }
      }
    }

    if (this.limitedStockStacks && number > 4) {
      return true;
    }

    return false;
  }

  hasCardsOnDiscardPile(playerId) {
    const playerIndex = this.players.findIndex(p => p.id === playerId);
    return this.stacks[17 + playerIndex * 3].cards.length > 0;
  }

  refillDrawStack(playerId) {
    const playerIndex = this.players.findIndex(p => p.id === playerId);
    const drawStack = this.stacks[16 + playerIndex * 3];
    const discardStack = this.stacks[17 + playerIndex * 3];

    drawStack.setCards(discardStack.cards.slice().reverse());
    discardStack.setCards([]);
  }

  hasPlayerWon(playerId) {
    const playerIndex = this.players.findIndex(p => p.id === playerId);
    const drawStack = this.stacks[16 + playerIndex * 3];
    const discardStack = this.stacks[17 + playerIndex * 3];
    const mainStack = this.stacks[18 + playerIndex * 3];

    return (
      !drawStack.cards.length &&
      !discardStack.cards.length &&
      !mainStack.cards.length
    );
  }

  /**
   * Create game stacks.
   */
  _createStacks() {
    this.stacks = [
      new Stack(this, STACK_TYPES.FAMILY), // 0
      new Stack(this, STACK_TYPES.FAMILY), // 1
      new Stack(this, STACK_TYPES.FAMILY), // 2
      new Stack(this, STACK_TYPES.FAMILY), // 3
      new Stack(this, STACK_TYPES.FAMILY), // 4
      new Stack(this, STACK_TYPES.FAMILY), // 5
      new Stack(this, STACK_TYPES.FAMILY), // 6
      new Stack(this, STACK_TYPES.FAMILY), // 7

      new Stack(this, STACK_TYPES.STOCK), // 8
      new Stack(this, STACK_TYPES.STOCK), // 9
      new Stack(this, STACK_TYPES.STOCK), // 10
      new Stack(this, STACK_TYPES.STOCK), // 11
      new Stack(this, STACK_TYPES.STOCK), // 12
      new Stack(this, STACK_TYPES.STOCK), // 13
      new Stack(this, STACK_TYPES.STOCK), // 14
      new Stack(this, STACK_TYPES.STOCK), // 15

      new Stack(this, STACK_TYPES.DRAW, this.players[0].id), // 16
      new Stack(this, STACK_TYPES.DISCARD, this.players[0].id), // 17
      new Stack(this, STACK_TYPES.MAIN, this.players[0].id), // 18

      new Stack(this, STACK_TYPES.DRAW, this.players[1].id), // 19
      new Stack(this, STACK_TYPES.DISCARD, this.players[1].id), // 20
      new Stack(this, STACK_TYPES.MAIN, this.players[1].id) // 21
    ];
  }

  /**
   * Initialise cards in game stacks.
   */
  _initStacks() {
    const cardDeck = [];

    Object.values(SUITS).forEach(suit => {
      Object.values(RANKS).forEach(rank => {
        cardDeck.push(new Card(suit, rank));
      });
    });

    [0, 1].forEach(player => {
      shuffle(cardDeck);

      // put 13 cards on main stack
      this.stacks[18 + player * 3].setCards(cardDeck.slice(0, 13));

      // put the rest on draw stack
      this.stacks[16 + player * 3].setCards(cardDeck.slice(13));
    });
  }
}

export default Game;
