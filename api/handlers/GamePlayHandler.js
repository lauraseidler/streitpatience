import BaseHandler from './BaseHandler';
import { setActiveStack } from '../redux/actions';
import store from '../redux/store';
import { STACK_TYPES } from '../game-objects/constants';

class GamePlayHandler extends BaseHandler {
  stackClick(stackId) {
    this._setPlayerAndGameId();

    if (!this._isPlayerInAnyGame()) {
      return;
    }

    if (!this._isPlayerTurn()) {
      console.log('wrong player');
      return;
    }

    const game = this._getPlayerGame().game;

    const activeStack = game.getActiveStack();
    const clickedStack = game.getStackById(stackId);

    if (!activeStack) {
      if (
        typeof clickedStack.player !== 'undefined' &&
        clickedStack.player !== this._getPlayerIndex()
      ) {
        console.log('cannot pick up cards from other players pile');
        return;
      }

      if (
        [STACK_TYPES.DISCARD, STACK_TYPES.FAMILY].indexOf(clickedStack.type) >
        -1
      ) {
        console.log('cannot pick up cards from discard and family piles');
        return;
      }

      if (clickedStack.cards.length < 1) {
        console.log('cannot pick up cards from empty stack');
        return;
      }

      console.log('mark stack active');
      store.dispatch(setActiveStack(this.gameId, stackId));
      this._updateGameForRoom();
      return;
    }

    if (
      activeStack.type === STACK_TYPES.DRAW &&
      clickedStack.type === STACK_TYPES.DRAW
    ) {
      console.log('cannot put cards back on draw stacks');
      return;
    }

    if (activeStack.id === clickedStack.id) {
      console.log('put card back down');
      store.dispatch(setActiveStack(this.gameId, null));
      this._updateGameForRoom();
      return;
    }

    console.log('TODO: try to move card');
  }

  _isPlayerTurn() {
    return this._getPlayerGame().game.playerTurn === this._getPlayerIndex();
  }

  _getPlayerIndex() {
    return this._getPlayerGame()
      .players.map(p => p.id)
      .indexOf(this.playerId);
  }
}

export default GamePlayHandler;
