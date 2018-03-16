import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';
import sha256 from 'js-sha256';

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
  playerId = sha256(socket.getId());

  playerName = () => {
    switch (this.props.playerType) {
      case PLAYER_TYPES.SELF:
        return 'You';

      case PLAYER_TYPES.OPPONENT: {
        if (this.props.players.length < 2) {
          return 'Waiting for opponent...';
        }

        const player = this.props.players.find(p => p.id !== this.playerId);

        if (player.offline) {
          return 'Opponent connection lost, waiting for reconnect...';
        }

        return player.username;
      }

      default:
        return null;
    }
  };

  render = () => (
    <Wrapper playerType={this.props.playerType}>{this.playerName()}</Wrapper>
  );
}

PlayerInfo.propTypes = {
  players: arrayOf(
    shape({
      id: string.isRequired,
      username: string.isRequired
    })
  ).isRequired,
  playerType: string.isRequired
};

const mapStateToProps = state => ({
  players: state.currentGame.players
});

export default connect(mapStateToProps)(PlayerInfo);
