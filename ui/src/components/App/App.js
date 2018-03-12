import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import socket from '../../socket';
import store from '../../redux/store';
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
    socket.init(store);
  };

  componentWillUnmount = () => {
    socket.disconnect();
  };

  render = () => (
    <Provider store={store}>
      <Grid>
        <Header />
        <GameArea />
      </Grid>
    </Provider>
  );
}

export default App;
