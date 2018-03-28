import React from 'react';
import styled from 'styled-components';

import { COLORS, GAME_VIEWS, GRID_GAP } from '../../variables';
import ActionButton from '../ActionButton/ActionButton';

const Grid = styled.div`
  display: grid;
  grid: 1fr 150px / 1fr 1fr;
  grid-gap: ${GRID_GAP};
  height: 100%;
`;

const ActionBoard = () => (
  <Grid>
    <ActionButton view={GAME_VIEWS.NEW_GAME}>New game</ActionButton>
    <ActionButton bg={COLORS.GREEN_LIGHT} view={GAME_VIEWS.JOIN_GAME}>
      Join game
    </ActionButton>
    <ActionButton bg={COLORS.GREEN_LIGHT} view={GAME_VIEWS.HELP}>
      Help
    </ActionButton>
    <ActionButton view={GAME_VIEWS.USERNAME_SETTING}>Set username</ActionButton>
  </Grid>
);

export default ActionBoard;
