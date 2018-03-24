import sha256 from 'js-sha256';
import { STACK_SETTINGS, STACK_TYPES, RANKS } from './constants';

let stackId = 0;

class Stack {
  constructor(type, player = null) {
    this.id = sha256(`stack ${++stackId} created at ${Date.now()}`);
    this.cards = [];

    if (Object.values(STACK_TYPES).indexOf(type) < 0) {
      throw new Error('Invalid stack type!');
    }

    this.isActive = false;
    this.type = type;
    this.settings = {
      ...STACK_SETTINGS.DEFAULT,
      ...STACK_SETTINGS[this.type]
    };

    if (!this.settings.belongsToPlayer) {
      return;
    }

    if (typeof player === 'undefined' || [0, 1].indexOf(player) < 0) {
      throw new Error('Invalid player!');
    }

    this.player = player;
  }

  setCards(cards) {
    this.cards = cards;
  }

  putCard(card, player) {
    // TODO: implement logic
    return true;
  }

  setActiveState(stackId) {
    this.isActive = this.id === stackId && this.cards.length > 0;
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

  removeCard() {
    return this.cards.splice(0, 1)[0];
  }

  addCard(card) {
    this.cards.splice(0, 0, card);
  }

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
