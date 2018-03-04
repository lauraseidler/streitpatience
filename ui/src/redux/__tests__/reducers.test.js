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
