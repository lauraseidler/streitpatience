import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import { GAME_VIEWS } from '../../variables';
import ActionBoard from '../ActionBoard/ActionBoard';
import Game from '../Game/Game';
import HelpContent from '../HelpContent/HelpContent';
import JoinGame from '../JoinGame/JoinGame';
import NewGame from '../NewGame/NewGame';
import ReconnectPrompt from '../ReconnectPrompt/ReconnectPrompt';
import TextArea from '../TextArea/TextArea';
import UsernameSetting from '../UsernameSetting/UsernameSetting';

const GameArea = props => {
  switch (props.gameView) {
    case GAME_VIEWS.ACTION_BOARD:
      return <ActionBoard />;
    case GAME_VIEWS.GAME:
      return <Game />;
    case GAME_VIEWS.HELP:
      return (
        <TextArea>
          <HelpContent />
        </TextArea>
      );
    case GAME_VIEWS.JOIN_GAME:
      return (
        <TextArea>
          <JoinGame />
        </TextArea>
      );
    case GAME_VIEWS.NEW_GAME:
      return (
        <TextArea>
          <NewGame />
        </TextArea>
      );
    case GAME_VIEWS.RECONNECT_PROMPT:
      return <ReconnectPrompt />;
    case GAME_VIEWS.USERNAME_SETTING:
      return (
        <TextArea>
          <UsernameSetting />
        </TextArea>
      );
    default:
      return null;
  }
};

GameArea.propTypes = {
  gameView: string.isRequired
};

const mapStateToProps = state => ({
  gameView: state.gameView
});

export default connect(mapStateToProps)(GameArea);
