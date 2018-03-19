import BaseHandler from './BaseHandler';

class GamePlayHandler extends BaseHandler {
  makeMove({ fromStack, toStack }) {
    this._setPlayerAndGameId();

    if (!this._isPlayerInAnyGame()) {
      return;
    }

    // TODO: implement move logic
  }
}

export default GamePlayHandler;
