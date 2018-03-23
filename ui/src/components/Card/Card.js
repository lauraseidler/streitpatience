import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { string, number, bool } from 'prop-types';

import { COLORS, FONTS } from '../../variables';

const Wrapper = styled.div`
  align-items: center;
  background: ${COLORS.WHITE};
  border: 2px solid ${props => (props.isActive ? '#0f0' : COLORS.WHITE)};
  border-radius: 2px;
  color: ${props => COLORS[props.color]};
  display: flex;
  flex-direction: column;
  font-family: ${FONTS.DECO};
  height: 100%;
  justify-content: space-evenly;
  padding: 10px;

  ${props =>
    props.isFaceVisible ||
    `
      background-color: ${COLORS.GREEN_DARK};
      background-image:
        linear-gradient(60deg, rgba(0,0,0,.3) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.3) 75%, rgba(0,0,0,.3)),
        linear-gradient(120deg, rgba(0,0,0,.3) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.3) 75%, rgba(0,0,0,.3));
      background-position: left -23px top -46px;
      background-size: 30px 50px;
  `};
`;

const Rank = styled.span`
  font-size: 2.3rem;
  letter-spacing: -5px;
  line-height: 1;
  padding-right: 5px;
`;

const Suit = styled.span`
  font-size: 3.5rem;
  line-height: 0.7;
`;

class Card extends Component {
  rank = () => {
    switch (this.props.rank) {
      case 13:
        return 'K';
      case 12:
        return 'Q';
      case 11:
        return 'J';
      case 1:
        return 'A';
      default:
        return this.props.rank;
    }
  };

  suitSymbol = () => {
    switch (this.props.suit) {
      case 'SPADES':
        return '&spades;';
      case 'CLUBS':
        return '&clubs;';
      case 'DIAMONDS':
        return '&diams;';
      case 'HEARTS':
        return '&hearts;';
      default:
        return '';
    }
  };

  render = () => (
    <Wrapper
      color={this.props.color}
      isFaceVisible={this.props.isFaceVisible}
      isActive={this.props.isActive}
    >
      {!this.props.isFaceVisible || (
        <Fragment>
          <Rank>{this.rank()}</Rank>
          <Suit dangerouslySetInnerHTML={{ __html: `${this.suitSymbol()}` }} />
        </Fragment>
      )}
    </Wrapper>
  );
}

Card.propTypes = {
  color: string.isRequired,
  isActive: bool.isRequired,
  isFaceVisible: bool.isRequired,
  rank: number.isRequired,
  suit: string.isRequired
};

export default Card;
