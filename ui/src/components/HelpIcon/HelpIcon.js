import React from 'react';
import styled from 'styled-components';

import { FONTS } from '../../variables';

const Icon = styled.span`
  align-items: center;
  border: 2px solid currentColor;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 30px;
  justify-content: center;
  font-family: ${FONTS.DECO};
  padding-top: 2px;
  width: 30px;
`;

const HelpIcon = () => <Icon title="Help is coming, hang tight!">?</Icon>;
export default HelpIcon;
