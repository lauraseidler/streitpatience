import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { arrayOf, string } from 'prop-types';

import socket from '../../socket';
import TextHeadline from '../TextHeadline/TextHeadline';
import Button from '../Button/Button';

const JoinGame = props => (
  <Fragment>
    <TextHeadline>Join game</TextHeadline>

    <p>Pick a game you would like to join:</p>

    <table>
      <tbody>
        {props.games.map(game => (
          <tr key={game}>
            <td>{game}</td>
            <td>
              <Button onClick={() => socket.joinGame(game)}>Join</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Fragment>
);

JoinGame.propTypes = {
  games: arrayOf(string).isRequired
};

const mapStateToProps = state => ({
  games: state.games
});

export default connect(mapStateToProps)(JoinGame);
