import styled from 'styled-components';

import { COLORS, FONTS } from '../../variables';

const BigButton = styled.button`
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
  word-break: break-all;

  &:hover {
    color: ${COLORS.WHITE};
  }
`;

BigButton.defaultProps = {
  bg: COLORS.GREEN_DARK
};

export default BigButton;
