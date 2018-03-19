import Stack from './Stack';
import { STACK_TYPES, SUITS, RANKS } from './constants';
import Card from './Card';

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
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
  constructor() {
    // random player start
    this.playerTurn = Math.round(Math.random());

    this.createStacks();
    this.initStacks();
  }

  createStacks() {
    this.familyStacks = [
      new Stack(STACK_TYPES.FAMILY),
      new Stack(STACK_TYPES.FAMILY),
      new Stack(STACK_TYPES.FAMILY),
      new Stack(STACK_TYPES.FAMILY),
      new Stack(STACK_TYPES.FAMILY),
      new Stack(STACK_TYPES.FAMILY),
      new Stack(STACK_TYPES.FAMILY),
      new Stack(STACK_TYPES.FAMILY),
    ];

    this.stockStacks = [
      new Stack(STACK_TYPES.STOCK),
      new Stack(STACK_TYPES.STOCK),
      new Stack(STACK_TYPES.STOCK),
      new Stack(STACK_TYPES.STOCK),
      new Stack(STACK_TYPES.STOCK),
      new Stack(STACK_TYPES.STOCK),
      new Stack(STACK_TYPES.STOCK),
      new Stack(STACK_TYPES.STOCK),
    ]

    this.playerStacks = [
      {
        draw: new Stack(STACK_TYPES.DRAW, 0),
        discard: new Stack(STACK_TYPES.DISCARD, 0),
        main: new Stack(STACK_TYPES.MAIN, 0)
      },
      {
        draw: new Stack(STACK_TYPES.DRAW, 1),
        discard: new Stack(STACK_TYPES.DISCARD, 1),
        main: new Stack(STACK_TYPES.MAIN, 1)
      }
    ]
  }

  initStacks() {
    const cardDeck = [];

    Object.values(SUITS).forEach(suit => {
      Object.values(RANKS).forEach(rank => {
        cardDeck.push(new Card(suit, rank));
      });
    });

    [0, 1].forEach(player => {
      shuffle(cardDeck);

      this.playerStacks[player].main.setCards(cardDeck.slice(0, 13));
      this.playerStacks[player].draw.setCards(cardDeck.slice(13));
    });
  }
}

export default Game;
