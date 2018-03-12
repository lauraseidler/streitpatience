import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import { GAME_VIEWS } from '../../variables';
import AboutContent from '../AboutContent/AboutContent';
import ActionBoard from '../ActionBoard/ActionBoard';
import NewGame from '../NewGame/NewGame';
import RulesContent from '../RulesContent/RulesContent';
import TextArea from '../TextArea/TextArea';
import Game from '../Game/Game';
import ReconnectPrompt from '../ReconnectPrompt/ReconnectPrompt';

const GameArea = props => {
  switch (props.gameView) {
    case GAME_VIEWS.ABOUT:
      return (
        <TextArea>
          <AboutContent />
        </TextArea>
      );
    case GAME_VIEWS.ACTION_BOARD:
      return <ActionBoard />;
    case GAME_VIEWS.GAME:
      return <Game />;
    case GAME_VIEWS.NEW_GAME:
      return (
        <TextArea>
          <NewGame />
        </TextArea>
      );
    case GAME_VIEWS.RECONNECT_PROMPT:
      return <ReconnectPrompt />;
    case GAME_VIEWS.RULES:
      return (
        <TextArea>
          <RulesContent />
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
