import { arrayOf, shape, string } from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import socket from '../../socket';
import { StackType } from '../../types';
import { COLORS, FONTS, GRID_GAP } from '../../variables';
import Errors from '../Errors/Errors';
import GameEndScreen from '../GameEndScreen/GameEndScreen';
import PlayerInfo, { PLAYER_TYPES } from '../PlayerInfo/PlayerInfo';
import Stack from '../Stack/Stack';

const GameTable = styled.div`
  display: grid;
  grid: 1fr / 100px 1fr 100px;
  grid-gap: ${GRID_GAP};
  min-height: 0;
`;

const GameBoard = styled.div`
  background: ${COLORS.GREEN_LIGHT};
  color: ${COLORS.WHITE};

  display: grid;

  grid-gap: ${GRID_GAP};

  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;

  grid-template-columns:
    minmax(36px, 95px) minmax(36px, 95px)
    minmax(36px, 95px) 1fr minmax(36px, 95px) minmax(36px, 95px)
    minmax(36px, 95px) minmax(36px, 95px) 1fr minmax(36px, 95px)
    minmax(36px, 95px) minmax(36px, 95px);

  grid-template-areas:
    'opponent-main opponent-draw opponent-discard . label-4 label-5 label-5 label-6 . . . .'
    '. . . . stock-1 family-1 family-8 stock-8 . . . .'
    '. . . . stock-2 family-2 family-7 stock-7 . . . .'
    '. . . . stock-3 family-3 family-6 stock-6 . . . .'
    '. . . . stock-4 family-4 family-5 stock-5 . label-1 label-2 label-3'
    '. . . . . . . . . self-discard self-draw self-main';

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
  grid-area: 2 / 4 / 6 / 10;
  justify-contents: center;
  margin: 0;
  padding: 100px;
  text-align: center;
`;

const StackLabel = styled.span`
  align-items: flex-end;
  display: flex;
  font-family: ${FONTS.DECO};
  grid-area: ${props => props.placement};
  justify-content: center;
`;

class Game extends Component {
  selfIndex = () => this.props.playerIds.indexOf(socket.getPlayerId());

  opponentIndex = () => (this.selfIndex() === 0 ? 1 : 0);

  adjustIndex = index => (this.selfIndex() === 0 ? index : (index + 4) % 8);

  render = () => (
    <GameTable>
      <PlayerInfo playerType={PLAYER_TYPES.OPPONENT} />

      <GameBoard>
        {this.props.game.stacks.length && this.selfIndex() > -1 ? (
          <Fragment>
            <Errors />
            {this.props.game.winner ? (
              <GameEndScreen winner={this.props.game.winner} />
            ) : null}
            <Stack
              placement="opponent-draw"
              {...this.props.game.stacks[16 + this.opponentIndex() * 3]}
            />

            <Stack
              placement="opponent-discard"
              {...this.props.game.stacks[17 + this.opponentIndex() * 3]}
            />

            <Stack
              placement="opponent-main"
              {...this.props.game.stacks[18 + this.opponentIndex() * 3]}
            />

            <StackLabel placement="label-4">Stock</StackLabel>
            <StackLabel placement="label-5">Family</StackLabel>
            <StackLabel placement="label-6">Stock</StackLabel>

            {this.props.game.stacks.map(
              (stack, i) =>
                i < 8 ? (
                  <Stack
                    key={stack.id}
                    placement={`family-${this.adjustIndex(i) + 1}`}
                    {...stack}
                  />
                ) : null
            )}

            {this.props.game.stacks.map(
              (stack, i) =>
                i >= 8 && i < 16 ? (
                  <Stack
                    key={stack.id}
                    align={this.adjustIndex(i - 8) < 4 ? 'right' : 'left'}
                    placement={`stock-${this.adjustIndex(i - 8) + 1}`}
                    {...stack}
                  />
                ) : null
            )}

            <StackLabel placement="label-1">Discard</StackLabel>
            <StackLabel placement="label-2">Draw</StackLabel>
            <StackLabel placement="label-3">Main</StackLabel>

            <Stack
              placement="self-draw"
              {...this.props.game.stacks[16 + this.selfIndex() * 3]}
            />

            <Stack
              placement="self-discard"
              {...this.props.game.stacks[17 + this.selfIndex() * 3]}
            />

            <Stack
              placement="self-main"
              {...this.props.game.stacks[18 + this.selfIndex() * 3]}
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
    currentPlayerId: string,
    stacks: arrayOf(StackType)
  }),
  playerIds: arrayOf(string).isRequired
};

Game.defaultProps = {
  game: null
};

const mapStateToProps = state => ({
  game: state.currentGame,
  playerIds: state.currentGame.players.map(p => p.id)
});

export default connect(mapStateToProps)(Game);
