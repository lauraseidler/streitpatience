import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { shape, number, arrayOf, string } from 'prop-types';

import { StackType } from '../../types';
import { COLORS, GRID_GAP, FONTS } from '../../variables';
import PlayerInfo, { PLAYER_TYPES } from '../PlayerInfo/PlayerInfo';
import socket from '../../socket';
import Stack from '../Stack/Stack';
import Errors from '../Errors/Errors';

const GameTable = styled.div`
  display: grid;
  grid: 50px 1fr 50px / 1fr;
  grid-gap: ${GRID_GAP};
  min-height: 0;
`;

const GameBoard = styled.div`
  background: ${COLORS.GREEN_LIGHT};
  color: ${COLORS.WHITE};

  display: grid;

  grid-gap: ${GRID_GAP};

  grid-template-rows:
    minmax(50px, 120px) 1fr minmax(50px, 120px) minmax(50px, 120px)
    minmax(50px, 120px) minmax(50px, 120px) 1fr minmax(50px, 120px);

  grid-template-columns:
    minmax(36px, 86px) minmax(36px, 86px)
    minmax(0, 1fr) minmax(172px, 4fr) minmax(36px, 86px)
    minmax(36px, 86px) minmax(172px, 4fr) minmax(0, 1fr)
    minmax(36px, 86px) minmax(36px, 86px);

  grid-template-areas:
    'opponent-draw opponent-discard . . . . . . . .'
    '. . . . . . . . . .'
    'opponent-main . . stock-1 family-1 family-2 stock-2 . . .'
    '. . . stock-3 family-3 family-4 stock-4 . . .'
    '. . . stock-5 family-5 family-6 stock-6 . . .'
    '. . . stock-7 family-7 family-8 stock-8 . . self-main'
    '. . . . . . . . . .'
    '. . . . . . . . self-discard self-draw';

  min-height: 0;
  overflow: hidden;
  padding: ${GRID_GAP};
  position: relative;
`;

const WaitingNotice = styled.p`
  align-items: center;
  display: flex;
  font-family: ${FONTS.DECO};
  font-size: 2rem;
  grid-area: 3 / 4 / 7 / 8;
  justify-contents: center;
  margin: 0;
  padding: 100px;
  text-align: center;
`;

class Game extends Component {
  selfIndex = () => this.props.playerIds.indexOf(socket.getPlayerId());

  opponentIndex = () => (this.selfIndex() === 0 ? 1 : 0);

  render = () => (
    <GameTable>
      <PlayerInfo playerType={PLAYER_TYPES.OPPONENT} />

      <GameBoard>
        {this.props.game && this.selfIndex() > -1 ? (
          <Fragment>
            <Errors />
            <Stack
              placement="opponent-draw"
              {...this.props.game.playerStacks[this.opponentIndex()].draw}
            />

            <Stack
              placement="opponent-discard"
              {...this.props.game.playerStacks[this.opponentIndex()].discard}
            />

            <Stack
              placement="opponent-main"
              {...this.props.game.playerStacks[this.opponentIndex()].main}
            />

            {this.props.game.familyStacks.map((stack, i) => (
              <Stack key={stack.id} placement={`family-${i + 1}`} {...stack} />
            ))}

            {this.props.game.stockStacks.map((stack, i) => (
              <Stack key={stack.id} placement={`stock-${i + 1}`} {...stack} />
            ))}

            <Stack
              placement="self-draw"
              {...this.props.game.playerStacks[this.selfIndex()].draw}
            />

            <Stack
              placement="self-discard"
              {...this.props.game.playerStacks[this.selfIndex()].discard}
            />

            <Stack
              placement="self-main"
              {...this.props.game.playerStacks[this.selfIndex()].main}
            />
          </Fragment>
        ) : (
          <WaitingNotice>Waiting for game to start...</WaitingNotice>
        )}
      </GameBoard>

      <PlayerInfo playerType={PLAYER_TYPES.SELF} />
    </GameTable>
  );
}

Game.propTypes = {
  game: shape({
    playerTurn: number.isRequired,
    familyStacks: arrayOf(StackType),
    stockStacks: arrayOf(StackType),
    playerStacks: arrayOf(
      shape({
        draw: StackType.isRequired,
        discard: StackType.isRequired,
        main: StackType.isRequired
      })
    )
  }),
  playerIds: arrayOf(string).isRequired
};

Game.defaultProps = {
  game: null
};

const mapStateToProps = state => ({
  game: state.currentGame.game,
  playerIds: state.currentGame.players.map(p => p.id)
});

export default connect(mapStateToProps)(Game);
