import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { func, string } from 'prop-types';

import { setGameView } from '../../redux/actions';
import { COLORS, FONTS } from '../../variables';

const Button = styled.button`
  align-items: center;
  background: ${props => props.bg};
  border: none;
  color: ${COLORS.FADE};
  cursor: pointer;
  display: flex;
  font-family: ${FONTS.DECO};
  font-size: 3rem;
  justify-content: center;
  padding: 5px 50px 0;
  text-align: center;

  &:hover {
    color: ${COLORS.WHITE};
  }
`;

class ActionButton extends Component {
  changeView = () => {
    if (this.props.view) {
      this.props.setGameView(this.props.view);
    }
  };

  render = () => (
    <Button bg={this.props.bg} onClick={this.changeView}>
      {this.props.children}
    </Button>
  );
}

ActionButton.propTypes = {
  bg: string,
  children: string.isRequired,
  setGameView: func.isRequired,
  view: string
};

ActionButton.defaultProps = {
  bg: COLORS.GREEN_DARK,
  view: null
};

const mapDispatchToProps = dispatch => ({
  setGameView(view) {
    dispatch(setGameView(view));
  }
});

export default connect(() => ({}), mapDispatchToProps)(ActionButton);
