import styled from 'styled-components';
import { COLORS, FONTS } from '../../variables';

const Button = styled.button`
  background: ${COLORS.GREEN_DARK};
  border: none;
  color: ${COLORS.FADE};
  cursor: pointer;
  font-family: ${FONTS.DECO};
  font-size: 1.2rem;
  margin-top: 5px;
  padding: 10px;

  &:hover {
    color: ${COLORS.WHITE};
  }
`;

export default Button;
