import React, { Fragment } from 'react';

import socket from '../../socket';
import TextHeadline from '../TextHeadline/TextHeadline';
import TextHighlight from '../TextHighlight/TextHighlight';
import Button from '../Button/Button';

const NewGame = () => (
  <Fragment>
    <TextHeadline>
      <TextHighlight>New game</TextHighlight>
    </TextHeadline>

    <p>Coming soon: picking a username, password protected games</p>

    <Button onClick={() => socket.newGame()}>Start game now!</Button>
  </Fragment>
);

export default NewGame;
