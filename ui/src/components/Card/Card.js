import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { string, number, bool } from 'prop-types';

import { COLORS, FONTS } from '../../variables';

const Wrapper = styled.div`
  align-items: center;
  background: ${COLORS.WHITE};
  border: 2px solid ${props => (props.isActive ? '#0f0' : COLORS.WHITE)};
  border-radius: 2px;
  box-shadow: 0px 0px 2px ${COLORS.BLACK};
  color: ${props => COLORS[props.color]};
  display: inline-flex;
  flex-direction: row;
  font-family: ${FONTS.DECO};
  height: 100%;
  justify-content: space-between;
  padding: 3px;
  width: 100%;

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

  position: absolute;
  top: 0;
  right: auto;
  left: auto;
  ${props => props.align}: ${props => props.offset * 25}px;
  z-index: ${props => props.offset + 1};
  bottom: 0;
  user-select: none;
`;

const Rank = styled.span`
  font-size: ${props => (props.large ? '1.9rem' : '1.1rem')};
  letter-spacing: -5px;
  line-height: 1;
  padding-right: 5px;
  pointer-events: none;
  user-select: none;
`;

const Suit = styled.span`
  font-size: ${props => (props.large ? '2.8rem' : '1.5rem')};
  line-height: 0.7;
  pointer-events: none;
  user-select: none;
`;

const SymbolWrapper = styled.div`
  align-self: ${props => props.placement};
  align-items: center;
  display: flex;
  flex-direction: column;

  ${props => !props.flipped || `transform: rotate(180deg);`};
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
    <Wrapper {...this.props}>
      {!this.props.isFaceVisible || (
        <Fragment>
          <SymbolWrapper placement="flex-start">
            <Rank>{this.rank()}</Rank>
            <Suit
              dangerouslySetInnerHTML={{ __html: `${this.suitSymbol()}` }}
            />
          </SymbolWrapper>

          <SymbolWrapper placement="center">
            <Rank large>{this.rank()}</Rank>
            <Suit
              large
              dangerouslySetInnerHTML={{ __html: `${this.suitSymbol()}` }}
            />
          </SymbolWrapper>

          <SymbolWrapper placement="flex-end" flipped>
            <Rank>{this.rank()}</Rank>
            <Suit
              dangerouslySetInnerHTML={{ __html: `${this.suitSymbol()}` }}
            />
          </SymbolWrapper>
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
