export const SUITS = {
  HEARTS: 'HEARTS',
  DIAMONDS: 'DIAMONDS',
  CLUBS: 'CLUBS',
  SPADES: 'SPADES',
}

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
}

export const COLORS = {
  BLACK: 'BLACK',
  RED: 'RED'
}

export const STACK_TYPES = {
  FAMILY: 'FAMILY',
  STOCK: 'STOCK',
  DRAW: 'DRAW',
  DISCARD: 'DISCARD',
  MAIN: 'MAIN'
}

export const FACE_DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
}

export const CARD_SPREAD = {
  NONE: 'NONE',
  EDGE: 'EDGE'
}

export const STACK_COLORS = {
  SUIT: 'SUIT',
  ALTERNATE: 'ALTERNATE',
}

export const RANK_RESTRICTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  BOTH: 'BOTH',
}

export const STACK_SETTINGS = {
  DEFAULT: {
    face: FACE_DIRECTION.UP,
    spread: CARD_SPREAD.NONE,
    rank: null,
    colors: null,
    belongsToPlayer: false,
    cardsMovable: true,
    opponentPlayable: false,
    opponentSettings: {
      rank: RANK_RESTRICTION.BOTH,
      colors: STACK_COLORS.SUIT
    }
  },

  FAMILY: {
    colors: STACK_COLORS.SUIT,
    rank: RANK_RESTRICTION.UP,
    cardsMovable: false,
  },

  STOCK: {
    spread: CARD_SPREAD.EDGE,
    colors: STACK_COLORS.ALTERNATE,
    rank: RANK_RESTRICTION.DOWN,
  },

  DRAW: {
    face: FACE_DIRECTION.DOWN,
    belongsToPlayer: true,
  },

  DISCARD: {
    belongsToPlayer: true,
    opponentPlayable: true
  },

  MAIN: {
    face: FACE_DIRECTION.DOWN,
    firstCardFace: FACE_DIRECTION.UP,
    belongsToPlayer: true,
    opponentPlayable: true,
  }
}
