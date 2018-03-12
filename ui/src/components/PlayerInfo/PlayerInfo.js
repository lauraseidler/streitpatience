import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, string } from 'prop-types';
import styled from 'styled-components';

import socket from '../../socket';
import { FONTS, COLORS, GRID_GAP } from '../../variables';

export const PLAYER_TYPES = {
  SELF: 'SELF',
  OPPONENT: 'OPPONENT'
};

const Wrapper = styled.div`
  align-items: center;
  background: ${COLORS.GREEN_DARK};
  color: ${COLORS.WHITE};
  display: flex;
  font-family: ${FONTS.DECO};
  justify-content: ${props =>
    props.playerType === PLAYER_TYPES.SELF ? 'flex-end' : 'flex-start'};
  padding: ${GRID_GAP};
`;

class PlayerInfo extends Component {
  playerId = socket.getID();

  playerName = () => {
    switch (this.props.playerType) {
      case PLAYER_TYPES.SELF:
        return 'You';

      case PLAYER_TYPES.OPPONENT:
        if (this.props.players.length < 2) {
          return 'Waiting for player...';
        }

        return this.props.players.find(p => p !== this.playerId);

      default:
        return null;
    }
  };

  render = () => (
    <Wrapper playerType={this.props.playerType}>{this.playerName()}</Wrapper>
  );
}

PlayerInfo.propTypes = {
  players: arrayOf(string).isRequired,
  playerType: string.isRequired
};

const mapStateToProps = state => ({
  players: state.playerGame.players
});

export default connect(mapStateToProps)(PlayerInfo);
