import styled from 'styled-components';
import { COLORS, FONTS } from '../../variables';

const TextHeadline = styled.h2`
  color: ${props => (props.faded ? COLORS.FADE : COLORS.WHITE)};
  font-family: ${FONTS.DECO};
  font-size: 2.5rem;
  font-weight: normal;
  line-height: 1;
  margin: 25px;
`;

export default TextHeadline;
