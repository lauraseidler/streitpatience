import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { func, string } from 'prop-types';

import { setGameView } from '../../redux/actions';
import TextHeadline from '../TextHeadline/TextHeadline';
import Button from '../Button/Button';
import { GAME_VIEWS, COLORS, FONTS } from '../../variables';
import socket from '../../socket';

const Input = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid ${COLORS.FADE};
  color: ${COLORS.WHITE};
  font-family: ${FONTS.DECO};
  font-size: 16px;
  padding: 5px;
  text-align: center;

  &:focus {
    border-color: ${COLORS.WHITE};
    outline: none;
  }
`;

class UsernameSetting extends Component {
  state = {
    username: this.props.username
  };

  saveUsername = () => {
    socket.emit('setUsername', this.state.username);
    this.props.setGameView(GAME_VIEWS.ACTION_BOARD);
  };

  render = () => (
    <Fragment>
      <TextHeadline>Set your username</TextHeadline>

      <Input
        type="text"
        value={this.state.username}
        onChange={e => this.setState({ username: e.target.value })}
      />

      <p>
        Please note that while usernames do not have to be unique (and you can
        also remove your username alltogether by leaving the field blank),
        you're still encouraged to pick something to easily identify you as a
        player.
      </p>

      <Button onClick={() => this.saveUsername()}>Save username</Button>
    </Fragment>
  );
}

UsernameSetting.propTypes = {
  setGameView: func.isRequired,
  username: string.isRequired
};

const mapStateToProps = state => ({ username: state.username });

const mapDispatchToProps = dispatch => ({
  setGameView(view) {
    dispatch(setGameView(view));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UsernameSetting);
