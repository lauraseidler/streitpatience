import React from 'react';
import styled from 'styled-components';
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

const Game = () => (
  <GameTable>
    <PlayerInfo playerType={PLAYER_TYPES.OPPONENT} />
    <GameBoard> Game board </GameBoard>
    <PlayerInfo playerType={PLAYER_TYPES.SELF} />
  </GameTable>
);

export default Game;
