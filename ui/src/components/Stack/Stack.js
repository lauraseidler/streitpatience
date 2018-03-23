import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bool, string, arrayOf, func, number } from 'prop-types';

import Card from '../Card/Card';
import { CardType } from '../../types';
import { COLORS } from '../../variables';
import { setActiveStack } from '../../redux/actions';
import socket from '../../socket';

const Wrapper = styled.div`
  border: 1px solid ${props => (props.isActive ? '#0f0' : COLORS.FADE)};
  border-radius: 2px;
  grid-area: ${props => props.placement};

  ${props => !props.canBeInteractedWith || `cursor: pointer;`};
`;

class Stack extends Component {
  setActive = () => {
    if (this.canBeInteractedWith()) {
      this.props.setActiveStack(this.props.isActive ? null : this.props.id);
    }
  };

  canBeInteractedWith = () => {
    // no moving from family or discard stacks
    if (this.props.type === 'FAMILY' || this.props.type === 'DISCARD') {
      return false;
    }

    // no moving from empty stacks
    if (!this.props.cards.length) {
      return false;
    }

    const ownIndex = this.props.playerIds.indexOf(socket.getPlayerId());

    // no moving from opponent stacks
    if (this.props.player !== null && this.props.player !== ownIndex) {
      return false;
    }

    // no de-selecting draw stack
    if (this.props.isActive && this.props.type === 'DRAW') {
      return false;
    }

    return true;
  };

  render = () => (
    <Wrapper
      placement={this.props.placement}
      onClick={() => this.setActive()}
      isActive={this.props.isActive}
      canBeInteractedWith={this.canBeInteractedWith()}
    >
      {!this.props.cards.length || (
        <Card
          {...this.props.cards[0]}
          isFaceVisible={this.props.isFaceVisible}
          isActive={this.props.isActive}
        />
      )}
    </Wrapper>
  );
}

Stack.propTypes = {
  cards: arrayOf(CardType).isRequired,
  id: string.isRequired,
  isActive: bool.isRequired,
  isFaceVisible: bool.isRequired,
  placement: string.isRequired,
  player: number,
  playerIds: arrayOf(string).isRequired,
  setActiveStack: func.isRequired,
  type: string.isRequired
};

Stack.defaultProps = {
  player: null
};

const mapStateToProps = (state, ownProps) => ({
  isActive: state.activeStack === ownProps.id,
  isFaceVisible:
    ownProps.type !== 'DRAW' ||
    (ownProps.type === 'DRAW' && state.activeStack === ownProps.id),
  playerIds: state.currentGame.players.map(p => p.id)
});

const mapDispatchToProps = { setActiveStack };

export default connect(mapStateToProps, mapDispatchToProps)(Stack);
