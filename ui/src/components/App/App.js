import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import socket from '../../socket';
import store from '../../redux/store';
import Header from '../Header/Header';
import GameArea from '../GameArea/GameArea';

const Grid = styled.div`
  display: grid;
  grid: auto 1fr / 1fr;
  grid-gap: 10px;
  height: 100vh;
  padding: 10px;
`;

class App extends Component {
  componentDidMount() {
    socket.init(store);
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  render() {
    return (
      <Provider store={store}>
        <Grid>
          <Header />
          <GameArea />
        </Grid>
      </Provider>
    );
  }
}

export default App;
