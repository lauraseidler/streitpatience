import React, { Component } from 'react';
import styled from 'styled-components';
import { bool, string, arrayOf, number } from 'prop-types';

import socket from '../../socket';
import { CardType } from '../../types';
import { COLORS } from '../../variables';
import Card from '../Card/Card';

const Wrapper = styled.div`
  border: 1px solid ${props => (props.isActive ? '#0f0' : COLORS.FADE)};
  border-radius: 2px;
  cursor: pointer;
  grid-area: ${props => props.placement};
`;

class Stack extends Component {
  isFaceVisible = () =>
    this.props.type !== 'DRAW' ||
    (this.props.type === 'DRAW' && this.props.isActive);

  render = () => (
    <Wrapper
      placement={this.props.placement}
      onClick={() => socket.emit('stackClick', this.props.id)}
      isActive={this.props.isActive}
    >
      {!this.props.cards.length || (
        <Card
          {...this.props.cards[0]}
          isFaceVisible={this.isFaceVisible()}
          isActive={this.props.isActive}
        />
      )}
    </Wrapper>
  );
}

Stack.propTypes = {
  cards: arrayOf(CardType).isRequired,
  id: string.isRequired,
  isActive: bool,
  placement: string.isRequired,
  player: number,
  type: string.isRequired
};

Stack.defaultProps = {
  isActive: false,
  player: null
};

export default Stack;
