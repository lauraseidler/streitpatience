import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape, string, number } from 'prop-types';
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
  border-${props =>
    props.playerType === PLAYER_TYPES.SELF
      ? 'left'
      : 'right'}: 10px solid ${props =>
  props.activePlayer ? 'red' : COLORS.GREEN_DARK};
  color: ${COLORS.WHITE};
  display: flex;
  font-family: ${FONTS.DECO};
  justify-content: ${props =>
    props.playerType === PLAYER_TYPES.SELF ? 'flex-end' : 'flex-start'};
  padding: ${GRID_GAP};
`;

class PlayerInfo extends Component {
  playerName = () => {
    switch (this.props.playerType) {
      case PLAYER_TYPES.SELF:
        return 'You';

      case PLAYER_TYPES.OPPONENT: {
        if (this.props.players.length < 2) {
          return 'Waiting for opponent...';
        }

        const player = this.props.players.find(
          p => p.id !== socket.getPlayerId()
        );

        if (player.offline) {
          return 'Opponent connection lost, waiting for reconnect...';
        }

        return player.username;
      }

      default:
        return null;
    }
  };

  activePlayer = () =>
    this.props.playerType === PLAYER_TYPES.SELF
      ? this.props.players.findIndex(p => p.id === socket.getPlayerId()) ===
        this.props.playerTurn
      : this.props.players.findIndex(p => p.id !== socket.getPlayerId()) ===
        this.props.playerTurn;

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
  playerTurn: number
};

PlayerInfo.defaultProps = {
  playerTurn: null
};

const mapStateToProps = state => ({
  players: state.currentGame.players,
  playerTurn: state.currentGame.game ? state.currentGame.game.playerTurn : null
});

export default connect(mapStateToProps)(PlayerInfo);
