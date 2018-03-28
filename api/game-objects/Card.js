import { SUITS, RANKS, COLORS } from './constants';

/**
 * Playing card.
 */
class Card {
  /**
   * Create new card.
   * @param {string} suit Card suit
   * @param {string} rank Card rank
   */
  constructor(suit, rank) {
    if (Object.values(SUITS).indexOf(suit) < 0) {
      throw new Error('Invalid suit!');
    }

    if (Object.values(RANKS).indexOf(rank) < 0) {
      throw new Error('Invalid rank!');
    }

    this.suit = suit;
    this.rank = rank;
    this.color =
      suit === SUITS.HEARTS || suit === SUITS.DIAMONDS
        ? COLORS.RED
        : COLORS.BLACK;
  }
}

export default Card;
