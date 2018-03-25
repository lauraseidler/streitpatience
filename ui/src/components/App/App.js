import React, { Component } from 'react';
import styled from 'styled-components';

import socket from '../../socket';
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
  componentDidMount = () => {
    socket.init();
  };

  componentWillUnmount = () => {
    socket.emit('disconnect');
  };

  render = () => (
    <Grid>
      <Header />
      <GameArea />
    </Grid>
  );
}

export default App;
