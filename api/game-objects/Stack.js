import { STACK_SETTINGS, STACK_TYPES } from './constants';

class Stack {
  constructor(type, player = null) {
    this.cards = [];

    if (Object.values(STACK_TYPES).indexOf(type) < 0) {
      throw new Error('Invalid stack type!');
    }

    this.type = type;
    this.settings = STACK_SETTINGS[this.type];

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
}

export default Stack;
