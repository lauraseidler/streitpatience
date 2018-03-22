import sha256 from 'js-sha256';
import { STACK_SETTINGS, STACK_TYPES } from './constants';

let stackId = 0;

class Stack {
  constructor(type, player = null) {
    this.id = sha256(`stack ${++stackId} created at ${Date.now()}`);
    this.cards = [];

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

  toJSON() {
    return {
      id: this.id,
      player: this.player,
      type: this.type,
      cards: this.cards
    };
  }
}

export default Stack;
