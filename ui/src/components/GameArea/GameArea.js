import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import { GAME_VIEWS } from '../../variables';
import AboutContent from '../AboutContent/AboutContent';
import ActionBoard from '../ActionBoard/ActionBoard';
import RulesContent from '../RulesContent/RulesContent';
import TextArea from '../TextArea/TextArea';

const GameArea = props => {
  switch (props.gameView) {
    case GAME_VIEWS.ABOUT:
      return (
        <TextArea>
          <AboutContent />
        </TextArea>
      );
    case GAME_VIEWS.RULES:
      return (
        <TextArea>
          <RulesContent />
        </TextArea>
      );
    case GAME_VIEWS.ACTION_BOARD:
      return <ActionBoard />;
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
