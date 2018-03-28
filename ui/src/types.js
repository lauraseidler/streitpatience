import { arrayOf, number, shape, string } from 'prop-types';

export const CardType = shape({
  suit: string.isRequired,
  rank: number.isRequired
});

export const StackType = shape({
  id: string.isRequired,
  type: string.isRequired,
  cards: arrayOf(CardType),
  player: string
});
