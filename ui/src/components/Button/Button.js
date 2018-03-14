import styled from 'styled-components';
import { COLORS, FONTS } from '../../variables';

const Button = styled.button`
  background: none;
  border: 1px solid ${COLORS.FADE};
  color: ${COLORS.FADE};
  cursor: pointer;
  font-family: ${FONTS.DECO};
  font-size: 1.2rem;
  margin-top: 5px;
  padding: 10px;

  &:hover,
  &:focus {
    border-color: ${COLORS.WHITE};
    color: ${COLORS.WHITE};
  }
`;

export default Button;
