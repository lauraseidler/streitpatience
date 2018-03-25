import sha256 from 'js-sha256';
import { STACK_SETTINGS, STACK_TYPES, RANKS } from './constants';

let stackId = 0;

/**
 * Card stack.
 */
class Stack {
  /**
   * Game the stack belongs to.
   *
   * @type {Game}
   */
  game = null;

  /**
   * Unique stack identifier.
   *
   * @type {string}
   */
  id = null;

  /**
   * Cards on the stack.
   *
   * @type {Array<Card>}
   */
  cards = [];

  /**
   * Whether the stack is currently active.
   *
   * @type {bool}
   */
  isActive = false;

  /**
   * Stack type
   *
   * @type {string}
   */
  type = null;

  /**
   * Stack settings
   *
   * @type {Object}
   */
  settings = {};

  /**
   * Player ID
   *
   * @type {string}
   */
  player = null;

  /**
   * Create new stack.
   *
   * @param {Game}    game    Game the stack belongs to
   * @param {string}  type    Stack type
   * @param {string}  player  Unique player identifier
   */
  constructor(game, type, player = null) {
    this.game = game;
    this.id = sha256(`stack ${++stackId} created at ${Date.now()}`);

    if (Object.values(STACK_TYPES).indexOf(type) < 0) {
      throw new Error('Invalid stack type!');
    }

    this.type = type;
    this.settings = {
      ...STACK_SETTINGS.DEFAULT,
      ...STACK_SETTINGS[this.type]
    };

    if (!this.settings.belongsToPlayer) {
      return;
    }

    if (!player || this.game.players.map(p => p.id).indexOf(player) < 0) {
      throw new Error('Invalid player!');
    }

    this.player = player;
  }

  /**
   * Put any cards on the stack.
   *
   * @param {Array<Card>} cards Cards to be put on the stack
   */
  setCards(cards) {
    this.cards = cards;
  }

  cardAllowed(card, playerIndex) {
    switch (this.type) {
      case STACK_TYPES.FAMILY:
        if (!this.cards.length && card.rank === RANKS.ACE) {
          // allow aces on empty stacks
          return true;
        }

        if (
          this.cards.length &&
          this.cards[0].rank + 1 === card.rank &&
          this.cards[0].suit === card.suit
        ) {
          // allow next higher card of same suit
          return true;
        }

        return false;

      case STACK_TYPES.STOCK:
        if (!this.cards.length) {
          // allow all cards if stack is empty
          return true;
        }

        if (
          this.cards.length &&
          this.cards[0].rank - 1 === card.rank &&
          this.cards[0].color !== card.color
        ) {
          // allow next lower card of different color
          return true;
        }

        return false;

      case STACK_TYPES.DISCARD:
      case STACK_TYPES.MAIN:
        if (this.player === playerIndex) {
          // allow all cards on own piles)
          return true;
        }

        if (
          this.cards.length &&
          (this.cards[0].rank - 1 === card.rank ||
            this.cards[0].rank + 1 === card.rank) &&
          this.cards[0].suit === card.suit
        ) {
          // allow cards one up and down in same suit on opponents stacks
          return true;
        }

        return false;

      default:
        return false;
    }
  }

  /**
   * Remove card from stack and return it.
   *
   * @returns {Card} Removed card
   */
  removeCard() {
    return this.cards.splice(0, 1)[0];
  }

  /**
   * Add card to the top of the stack.
   *
   * @param {Card} card Card to add to the stack
   */
  addCard(card) {
    this.cards.splice(0, 0, card);
  }

  /**
   * Whether the stack belongs to the player.
   *
   * @param {string} playerId Unique player identifier
   * @returns {bool}
   */
  isPlayerStack(playerId) {
    return this.player === playerId;
  }

  /**
   * Whether the stack is a communal stack.
   *
   * @returns {bool}
   */
  isCommunalStack() {
    return this.player === null;
  }

  /**
   * Whether the stack belongs to the opponent of the given player.
   *
   * @param {string} playerId Unique player identifier
   * @returns {bool}
   */
  isOpponentStack(playerId) {
    return !this.isPlayerStack(playerId) && !this.isCommunalStack();
  }

  /**
   * Whether cards from this stack can be picked up.
   *
   * @returns {bool}
   */
  canPickUpCard() {
    return this.settings.canPickUpCard;
  }

  /**
   * Whether a card can be put back on this stack.
   *
   * @returns {bool}
   */
  canPutCardBack() {
    return this.settings.canPutCardBack;
  }

  /**
   * Whether the opponent can put a card on this stack.
   *
   * @returns {bool}
   */
  canOpponentPutCard() {
    return this.settings.canOpponentPutCard;
  }

  /**
   * Get properties to serialize for client
   */
  toJSON() {
    return {
      id: this.id,
      player: this.player,
      type: this.type,
      cards: this.cards,
      isActive: this.isActive
    };
  }
}

export default Stack;
