import { number, string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { COLORS, FONTS } from '../../variables';
import HelpIcon from '../HelpIcon/HelpIcon';
import TextHighlight from '../TextHighlight/TextHighlight';

const Wrapper = styled.header`
  align-items: center;
  background: ${COLORS.BLACK};
  color: ${COLORS.FADE};
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;
`;

const Headline = styled.h1`
  font-family: ${FONTS.DECO};
  letter-spacing: 1px;
  margin: 0;
  padding: 8px 0 0;
`;

const Header = props => (
  <Wrapper>
    <Headline>
      Play <TextHighlight>Streitpatience</TextHighlight> online
    </Headline>

    <span>Hello, {props.username}!</span>

    <span>
      {`${props.onlinePlayers} ${
        props.onlinePlayers === 1 ? 'player' : 'players'
      } online`}
    </span>

    <HelpIcon />
  </Wrapper>
);

Header.propTypes = {
  onlinePlayers: number.isRequired,
  username: string
};

Header.defaultProps = {
  username: ''
};

const mapStateToProps = state => ({
  onlinePlayers: state.onlinePlayers,
  username: state.username
});

export default connect(mapStateToProps)(Header);
