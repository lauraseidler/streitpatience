import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';

import { setGameView } from '../../redux/actions';
import BigButton from '../BigButton/BigButton';

class ActionButton extends Component {
  changeView = () => {
    if (this.props.view) {
      this.props.setGameView(this.props.view);
    }
  };

  render = () => (
    <BigButton {...this.props} onClick={this.changeView}>
      {this.props.children}
    </BigButton>
  );
}

ActionButton.propTypes = {
  children: string.isRequired,
  setGameView: func.isRequired,
  view: string
};

ActionButton.defaultProps = {
  view: null
};

const mapDispatchToProps = dispatch => ({
  setGameView(view) {
    dispatch(setGameView(view));
  }
});

export default connect(() => ({}), mapDispatchToProps)(ActionButton);
