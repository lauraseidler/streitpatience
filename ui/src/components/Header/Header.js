import React from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';
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

    {`${props.onlinePlayers} ${
      props.onlinePlayers === 1 ? 'player' : 'players'
    } online`}

    <HelpIcon />
  </Wrapper>
);

Header.propTypes = {
  onlinePlayers: number.isRequired
};

const mapStateToProps = state => ({
  onlinePlayers: state.onlinePlayers
});

export default connect(mapStateToProps)(Header);
