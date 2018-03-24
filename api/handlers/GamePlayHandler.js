import BaseHandler from './BaseHandler';
import { setActiveStack } from '../redux/actions';
import store from '../redux/store';
import { STACK_TYPES } from '../game-objects/constants';
import uiActionTypes from '../ui-action-types';

class GamePlayHandler extends BaseHandler {
  stackClick(stackId) {
    this._setPlayerAndGameId();

    if (!this._isPlayerInAnyGame()) {
      return;
    }

    if (!this._isPlayerTurn()) {
      this._sendError(`It's not your turn!`);
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
        this._sendError(`You cannot play cards from your opponent's stacks!`);
        return;
      }

      if (
        clickedStack.type === STACK_TYPES.DISCARD ||
        clickedStack.type === STACK_TYPES.FAMILY
      ) {
        this._sendError(`You cannot play cards from this pile!`);
        return;
      }

      if (clickedStack.cards.length < 1) {
        this._sendError('There is no cards on this stack!');
        return;
      }

      store.dispatch(setActiveStack(this.gameId, stackId));
      this._updateGameForRoom();
      return;
    }

    if (
      activeStack.id === clickedStack.id &&
      clickedStack.type === STACK_TYPES.DRAW
    ) {
      this._sendError('You cannot put this card back down!');
      return;
    }

    if (
      clickedStack.type === STACK_TYPES.DRAW &&
      clickedStack.player !== this._getPlayerIndex()
    ) {
      this._sendError('You cannot place this card here!');
      return;
    }

    if (
      activeStack.id !== clickedStack.id &&
      clickedStack.player === this._getPlayerIndex() &&
      clickedStack.type === STACK_TYPES.MAIN
    ) {
      this._sendError(`You don't really want to place this card here...`);
      return;
    }

    if (activeStack.id === clickedStack.id) {
      store.dispatch(setActiveStack(this.gameId, null));
      this._updateGameForRoom();
      return;
    }

    this._sendError('TODO: try to move card');
  }

  _isPlayerTurn() {
    return this._getPlayerGame().game.playerTurn === this._getPlayerIndex();
  }

  _getPlayerIndex() {
    return this._getPlayerGame()
      .players.map(p => p.id)
      .indexOf(this.playerId);
  }

  _sendError(message) {
    console.log('ERROR:', message);
    this.client.emit(uiActionTypes.SET_ERROR_MESSAGE, message);
  }
}

export default GamePlayHandler;
