import React from 'react';
import styled from 'styled-components';

import HelpIcon from '../HelpIcon/HelpIcon';

const Wrapper = styled.header`
  align-items: center;
  background: #111;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;
`;

const Headline = styled.h1`
  font-family: 'Bowlby One SC', cursive;
  letter-spacing: 1px;
  margin: 0;
  padding: 8px 0 0;
`;

const Highlight = styled.span`
  color: white;
`;

export default function Header() {
  return (
    <Wrapper>
      <Headline>
        Play <Highlight>Streitpatience</Highlight> online
      </Headline>

      <HelpIcon />
    </Wrapper>
  );
}
