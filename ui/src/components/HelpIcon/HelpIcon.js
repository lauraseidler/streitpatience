import React from 'react';
import styled from 'styled-components';

const Icon = styled.span`
  align-items: center;
  border: 2px solid currentColor;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 30px;
  justify-content: center;
  font-family: 'Bowlby One SC', cursive;
  padding-top: 2px;
  width: 30px;
`;

export default function HelpIcon() {
  return (
    <Icon title="Help is coming, hang tight!">?</Icon>
  )
}
