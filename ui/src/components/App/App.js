import React from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import GameArea from '../GameArea/GameArea';

const Grid = styled.div`
  display: grid;
  grid: auto 1fr / 1fr;
  grid-gap: 10px;
  height: 100vh;
`;

export default function App() {
  return (
    <Grid>
      <Header />
      <GameArea />
    </Grid>
  );
}
