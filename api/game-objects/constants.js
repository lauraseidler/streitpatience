export const SUITS = {
  HEARTS: 'HEARTS',
  DIAMONDS: 'DIAMONDS',
  CLUBS: 'CLUBS',
  SPADES: 'SPADES'
};

export const RANKS = {
  ACE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13
};

export const COLORS = {
  BLACK: 'BLACK',
  RED: 'RED'
};

export const STACK_TYPES = {
  FAMILY: 'FAMILY',
  STOCK: 'STOCK',
  DRAW: 'DRAW',
  DISCARD: 'DISCARD',
  MAIN: 'MAIN'
};

export const STACK_SETTINGS = {
  DEFAULT: {
    belongsToPlayer: false,
    canOpponentPutCard: false,
    canPickUpCard: true,
    canPutCardBack: true
  },

  FAMILY: {
    canPickUpCard: false
  },

  STOCK: {},

  DRAW: {
    belongsToPlayer: true,
    canPutCardBack: false
  },

  DISCARD: {
    belongsToPlayer: true,
    canOpponentPutCard: true,
    canPickUpCard: false
  },

  MAIN: {
    belongsToPlayer: true,
    canOpponentPutCard: true
  }
};
