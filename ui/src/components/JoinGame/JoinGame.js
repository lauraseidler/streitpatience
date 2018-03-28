import { arrayOf, shape, string } from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import socket from '../../socket';
import Button from '../Button/Button';
import TextHeadline from '../TextHeadline/TextHeadline';

const JoinGame = props => (
  <Fragment>
    <TextHeadline>Join game</TextHeadline>

    <p>Pick a game you would like to join:</p>

    <table>
      <tbody>
        {props.games.map(game => (
          <tr key={game.id}>
            <td>{game.name}</td>
            <td>
              <Button onClick={() => socket.emit('joinGame', game.id)}>
                Join
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Fragment>
);

JoinGame.propTypes = {
  games: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  games: state.games
});

export default connect(mapStateToProps)(JoinGame);
