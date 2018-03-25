import React from 'react';
import styled from 'styled-components';

import socket from '../../socket';
import { GRID_GAP, COLORS } from '../../variables';
import TextHeadline from '../TextHeadline/TextHeadline';
import BigButton from '../BigButton/BigButton';

const Grid = styled.div`
  display: grid;
  grid: 150px 2fr 1fr / 1fr;
  grid-gap: ${GRID_GAP};
  height: 100%;
`;

const HeadlineWrapper = styled.div`
  align-items: center;
  background: ${COLORS.GREEN_LIGHT};
  display: flex;
  justify-content: center;
  text-align: center;
`;

const ReconnectPrompt = () => (
  <Grid>
    <HeadlineWrapper>
      <TextHeadline>
        You have an unfinished game. Would you like to reconnect?
      </TextHeadline>
    </HeadlineWrapper>

    <BigButton onClick={() => socket.doReconnect()}>Yes</BigButton>
    <BigButton onClick={() => socket.abortReconnect()} bg={COLORS.GREEN_LIGHT}>
      No
    </BigButton>
  </Grid>
);

export default ReconnectPrompt;
