import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { shape, number, string, arrayOf } from 'prop-types';

import { COLORS, GRID_GAP } from '../../variables';
import PlayerInfo, { PLAYER_TYPES } from '../PlayerInfo/PlayerInfo';

const GameTable = styled.div`
  display: grid;
  grid: 50px 1fr 50px / 1fr;
  grid-gap: ${GRID_GAP};
`;

const GameBoard = styled.div`
  background: ${COLORS.GREEN_LIGHT};
  color: ${COLORS.WHITE};
  padding: ${GRID_GAP};
`;

const Game = props => (
  <GameTable>
    <PlayerInfo playerType={PLAYER_TYPES.OPPONENT} />
    <GameBoard>
      { !props.game || JSON.stringify(props.game) }
    </GameBoard>
    <PlayerInfo playerType={PLAYER_TYPES.SELF} />
  </GameTable>
);

const CardType = shape({
  suit: string.isRequired,
  rank: number.isRequired
});

const StackType = shape({
  id: string.isRequired,
  type: string.isRequired,
  cards: arrayOf(CardType),
  player: number
});

Game.propTypes = {
  game: shape({
    playerTurn: number.isRequired,
    familyStacks: arrayOf(StackType),
    stockStacks: arrayOf(StackType),
    playerStacks: arrayOf(shape({
      draw: StackType,
      discard: StackType,
      main: StackType
    }))
  })
};

Game.defaultProps = {
  game: null,
};

const mapStateToProps = state => ({ game: state.currentGame.game });

export default connect(mapStateToProps)(Game);
