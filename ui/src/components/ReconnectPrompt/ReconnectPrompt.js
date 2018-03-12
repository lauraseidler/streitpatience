import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { func } from 'prop-types';

import socket from '../../socket';
import { abortReconnect } from '../../redux/actions';
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

const ReconnectPrompt = props => (
  <Grid>
    <HeadlineWrapper>
      <TextHeadline>
        You have an unfinished game. Would you like to reconnect?
      </TextHeadline>
    </HeadlineWrapper>

    <BigButton onClick={() => socket.reconnect()}>Yes</BigButton>
    <BigButton onClick={() => props.abortReconnect()} bg={COLORS.GREEN_LIGHT}>
      No
    </BigButton>
  </Grid>
);

ReconnectPrompt.propTypes = {
  abortReconnect: func.isRequired
};

const mapDispatchToProps = dispatch => ({
  abortReconnect() {
    dispatch(abortReconnect());
  }
});

export default connect(() => ({}), mapDispatchToProps)(ReconnectPrompt);
