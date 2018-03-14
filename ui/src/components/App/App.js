import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { func } from 'prop-types';

import socket from '../../socket';
import { setUsername } from '../../redux/actions';
import { GRID_GAP } from '../../variables';
import GameArea from '../GameArea/GameArea';
import Header from '../Header/Header';

const Grid = styled.div`
  display: grid;
  grid: auto 1fr / 1fr;
  grid-gap: ${GRID_GAP};
  height: 100vh;
  padding: 10px;
`;

class App extends Component {
  componentWillMount = () => {
    const username =
      localStorage.getItem('username') ||
      `user${Math.floor(Math.random() * 1000000)}`;

    this.props.setUsername(username);
  };

  componentDidMount = () => {
    socket.init();
  };

  componentWillUnmount = () => {
    socket.disconnect();
  };

  render = () => (
    <Grid>
      <Header />
      <GameArea />
    </Grid>
  );
}

App.propTypes = {
  setUsername: func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setUsername(username) {
    dispatch(setUsername(username));
  }
});

export default connect(() => ({}), mapDispatchToProps)(App);
