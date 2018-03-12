import 'jest-localstorage-mock';
import reducers from '../reducers';

test('SET_ONLINE_PLAYERS', () => {
  const state = reducers(
    { onlinePlayers: 0 },
    { type: 'SET_ONLINE_PLAYERS', payload: 1 }
  );

  expect(state).toMatchSnapshot();
});

test('SET_GAME_VIEW', () => {
  const state = reducers(
    { gameView: 'ACTION_BOARD' },
    { type: 'SET_GAME_VIEW', payload: 'ABOUT' }
  );

  expect(state).toMatchSnapshot();
});

test('SET_GAME_VIEW with illegal game view', () => {
  const state = reducers(
    { gameView: 'ACTION_BOARD' },
    { type: 'SET_GAME_VIEW', payload: 'completely bogus game view' }
  );

  expect(state).toMatchSnapshot();
});

test('SET_CURRENT_GAME for first player', () => {
  const state = reducers(
    { gameView: 'NEW_GAME', currentGame: null },
    {
      type: 'SET_CURRENT_GAME',
      payload: { id: '7gg1n2smCT2kkiwaAAAA', players: ['7gg1n2smCT2kkiwaAAAA'] }
    }
  );

  expect(state).toMatchSnapshot();
});

test('PROMPT_RECONNECT', () => {
  const state = reducers(
    { gameView: 'ACTION_BOARD' },
    { type: 'PROMPT_RECONNECT' }
  );

  expect(state).toMatchSnapshot();
});

test('ABORT_RECONNECT', () => {
  const state = reducers(
    { gameView: 'RECONNECT_PROMPT' },
    { type: 'ABORT_RECONNECT' }
  );

  expect(state).toMatchSnapshot();
});
