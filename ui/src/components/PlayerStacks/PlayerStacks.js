import React, { Component } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import Stack from '../Stack/Stack';
import { StackType } from '../../types';
import socket from '../../socket';
import { PLAYER_TYPES } from '../PlayerInfo/PlayerInfo';
import { COLORS } from '../../variables';

const Wrapper = styled.div`
  border: 1px solid ${COLORS.GREEN_DARK};
  border-radius: 0;
`;

class PlayerStack extends Component {
  playerType = () =>
    this.props.playerId === socket.getPlayerId()
      ? PLAYER_TYPES.SELF
      : PLAYER_TYPES.OPPONENT;

  render = () => (
    <Wrapper>
      <Stack {...this.props.draw} />
      <Stack {...this.props.discard} />
      <Stack {...this.props.main} />
    </Wrapper>
  );
}

PlayerStack.propTypes = {
  discard: StackType.isRequired,
  draw: StackType.isRequired,
  main: StackType.isRequired,
  playerId: string.isRequired
};

export default PlayerStack;
