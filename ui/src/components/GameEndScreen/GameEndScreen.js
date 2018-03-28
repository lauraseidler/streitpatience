import { string } from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import socket from '../../socket';
import { COLORS, FONTS } from '../../variables';

const Wrapper = styled.div`
  align-items: center;
  background: ${COLORS.FADE};
  bottom: 0;
  color: black;
  display: flex;
  font-family: ${FONTS.DECO};
  font-size: 6rem;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  text-shadow: 3px 3px 0 ${COLORS.GREEN_LIGHT};
  top: 0;
  width: 100%;
  z-index: 100;
`;

const GameEndScreen = props => (
  <Wrapper>
    {props.winner === socket.getPlayerId() ? 'You win' : 'You lose'}
  </Wrapper>
);

GameEndScreen.propTypes = {
  winner: string.isRequired
};

export default GameEndScreen;
