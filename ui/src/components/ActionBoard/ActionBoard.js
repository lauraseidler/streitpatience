import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid: 1fr 100px / 1fr 1fr;
  grid-gap: 10px;
  height: 100%;
`;

const ActionButton = styled.button`
  align-items: center;
  background: ${props => props.bg || '#01200f'};
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  display: flex;
  font-family: 'Bowlby One SC', cursive;
  font-size: 3rem;
  justify-content: center;
  padding: 12px 50px 0;
  text-align: center;

  &:hover {
    color: white;
  }
`;

export default function ActionBoard() {
  return (
    <Grid>
      <ActionButton bg="#01200f">New game</ActionButton>
      <ActionButton bg="#157F1F">Join game</ActionButton>
      <ActionButton bg="#157F1F">Rules</ActionButton>
      <ActionButton bg="#01200f">About</ActionButton>
    </Grid>
  );
}
