import { arrayOf, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import socket from '../../socket';
import { COLORS, FONTS, GRID_GAP } from '../../variables';

export const PLAYER_TYPES = {
  SELF: 'SELF',
  OPPONENT: 'OPPONENT'
};

const Wrapper = styled.div`
  align-items: ${props =>
    props.playerType === PLAYER_TYPES.SELF ? 'flex-end' : 'flex-start'};
  background: ${COLORS.GREEN_DARK};
  border-${props =>
    props.playerType === PLAYER_TYPES.SELF
      ? 'top'
      : 'bottom'}: 100px solid ${props =>
  props.activePlayer ? 'red' : COLORS.GREY};
  color: ${COLORS.WHITE};
  display: flex;
  font-family: ${FONTS.DECO};
  font-size: 1.3rem;
  hyphens: auto;
  justify-content: center;
  line-height: 1;
  padding: ${GRID_GAP};
  word-break: break-word;
`;

class PlayerInfo extends Component {
  playerName = () => {
    switch (this.props.playerType) {
      case PLAYER_TYPES.SELF:
        return 'You';

      case PLAYER_TYPES.OPPONENT: {
        if (this.props.players.length < 2) {
          return 'Wai­ting for oppo­nent...';
        }

        const player = this.props.players.find(
          p => p.id !== socket.getPlayerId()
        );

        if (!player.online) {
          return 'Wai­ting for oppo­nent...';
        }

        return player.username;
      }

      default:
        return null;
    }
  };

  activePlayer = () =>
    !this.props.currentPlayerId || this.props.playerType === PLAYER_TYPES.SELF
      ? this.props.players.find(p => p.id === socket.getPlayerId()).id ===
        this.props.currentPlayerId
      : this.props.players.find(p => p.id !== socket.getPlayerId()).id ===
        this.props.currentPlayerId;

  render = () => (
    <Wrapper
      activePlayer={this.activePlayer()}
      playerType={this.props.playerType}
    >
      {this.playerName()}
    </Wrapper>
  );
}

PlayerInfo.propTypes = {
  players: arrayOf(
    shape({
      id: string.isRequired,
      username: string.isRequired
    })
  ).isRequired,
  playerType: string.isRequired,
  currentPlayerId: string
};

PlayerInfo.defaultProps = {
  currentPlayerId: null
};

const mapStateToProps = state => ({
  players: state.currentGame.players,
  currentPlayerId: state.currentGame.currentPlayerId
});

export default connect(mapStateToProps)(PlayerInfo);
