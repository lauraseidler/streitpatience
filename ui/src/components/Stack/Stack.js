import { arrayOf, bool, string } from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import socket from '../../socket';
import { CardType } from '../../types';
import { COLORS } from '../../variables';
import Card from '../Card/Card';

const Wrapper = styled.div`
  border: 1px solid ${props => (props.isActive ? '#0f0' : COLORS.FADE)};
  border-radius: 2px;
  cursor: pointer;
  grid-area: ${props => props.placement};
  position: relative;

  ${props => !props.align || `border-style: solid none solid none;`}
  border-${props => props.align}-style: solid;
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
      align={this.props.align}
    >
      {this.props.cards.map(
        (card, index) =>
          this.props.type === 'STOCK' || index === 0 ? (
            <Card
              {...card}
              align={this.props.align}
              key={`${card.suit}-${card.rank}-${this.props.player}`}
              offset={
                this.props.type === 'STOCK'
                  ? this.props.cards.length - 1 - index
                  : 0
              }
              index={index}
              isFaceVisible={this.isFaceVisible()}
              isActive={index === 0 && this.props.isActive}
            />
          ) : null
      )}
    </Wrapper>
  );
}

Stack.propTypes = {
  align: string,
  cards: arrayOf(CardType).isRequired,
  id: string.isRequired,
  isActive: bool,
  placement: string.isRequired,
  player: string,
  type: string.isRequired
};

Stack.defaultProps = {
  align: null,
  isActive: false,
  player: null
};

export default Stack;
