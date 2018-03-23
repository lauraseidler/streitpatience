import socket from '../socket';
import { GAME_VIEWS } from '../variables';
import {
  SET_ONLINE_PLAYERS,
  SET_GAME_VIEW,
  SET_CURRENT_GAME,
  PROMPT_RECONNECT,
  ABORT_RECONNECT,
  SET_GAMES,
  SET_USERNAME,
  SET_ACTIVE_STACK
} from './action-types';

const DEFAULT_STATE = {
  activeStack: null,
  currentGame: null,
  games: [],
  gameView: GAME_VIEWS.ACTION_BOARD,
  onlinePlayers: 0,
  username: null
};

const setOnlinePlayers = (state, action) => ({
  ...state,
  onlinePlayers: action.payload
});

const setGameView = (state, action) => {
  // do nothing if game view is not supported
  if (!GAME_VIEWS[action.payload]) {
    return state;
  }

  return {
    ...state,
    gameView: action.payload
  };
};

const setCurrentGame = (state, action) => {
  localStorage.setItem('gameId', action.payload.id);
  localStorage.setItem('socketClientId', socket.getId());

  return {
    ...state,
    gameView: GAME_VIEWS.GAME,
    currentGame: action.payload
  };
};

const promptReconnect = state => ({
  ...state,
  gameView: GAME_VIEWS.RECONNECT_PROMPT
});

const abortReconnect = state => {
  localStorage.removeItem('gameId');
  localStorage.removeItem('socketClientId');

  return {
    ...state,
    gameView: GAME_VIEWS.ACTION_BOARD
  };
};

const setGames = (state, action) => ({
  ...state,
  games: action.payload
});

const setUsername = (state, action) => {
  localStorage.setItem('username', action.payload);

  return {
    ...state,
    username: action.payload
  };
};

const setActiveStack = (state, action) => {
  const stacks = [
    ...state.currentGame.game.familyStacks,
    ...state.currentGame.game.stockStacks,
    state.currentGame.game.playerStacks[0].draw,
    state.currentGame.game.playerStacks[0].discard,
    state.currentGame.game.playerStacks[0].main,
    state.currentGame.game.playerStacks[1].draw,
    state.currentGame.game.playerStacks[1].discard,
    state.currentGame.game.playerStacks[1].main
  ];

  console.log(stacks);

  if (state.activeStack) {
    const activeStackType = stacks.find(s => s.id === state.activeStack).type;

    console.log(activeStackType);

    // if it's a draw card, it can't be put down again
    if (activeStackType === 'DRAW' || action.payload !== null) {
      return state;
    }
  }

  return {
    ...state,
    activeStack: action.payload
  };
};

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ONLINE_PLAYERS:
      return setOnlinePlayers(state, action);
    case SET_GAME_VIEW:
      return setGameView(state, action);
    case SET_CURRENT_GAME:
      return setCurrentGame(state, action);
    case PROMPT_RECONNECT:
      return promptReconnect(state);
    case ABORT_RECONNECT:
      return abortReconnect(state);
    case SET_GAMES:
      return setGames(state, action);
    case SET_USERNAME:
      return setUsername(state, action);
    case SET_ACTIVE_STACK:
      return setActiveStack(state, action);
    default:
      return state;
  }
};

export default rootReducer;
