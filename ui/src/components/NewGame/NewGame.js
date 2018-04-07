import React, { Fragment } from 'react';

import socket from '../../socket';
import Button from '../Button/Button';
import TextHeadline from '../TextHeadline/TextHeadline';

const NewGame = () => (
  <Fragment>
    <TextHeadline>New game</TextHeadline>

    <p>Coming soon: password protected games, game options</p>

    <Button onClick={() => socket.emit('newGame')}>Start game now!</Button>
  </Fragment>
);

export default NewGame;
