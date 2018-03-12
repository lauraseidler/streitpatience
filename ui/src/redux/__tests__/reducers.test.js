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

test('CREATE_NEW_GAME', () => {
  const state = reducers(
    {
      games: {}
    },
    { type: 'CREATE_NEW_GAME', payload: '7gg1n2smCT2kkiwaAAAA' }
  );

  expect(state).toEqual({
    games: {
      '7gg1n2smCT2kkiwaAAAA': {
        id: '7gg1n2smCT2kkiwaAAAA',
        players: ['7gg1n2smCT2kkiwaAAAA']
      }
    }
  });
});

test('START_PLAYER_GAME for first player', () => {
  const state = reducers(
    { gameView: 'NEW_GAME', playerGame: null },
    {
      type: 'START_PLAYER_GAME',
      payload: { id: '7gg1n2smCT2kkiwaAAAA', players: ['7gg1n2smCT2kkiwaAAAA'] }
    }
  );

  expect(state).toEqual({
    gameView: 'GAME',
    playerGame: {
      id: '7gg1n2smCT2kkiwaAAAA',
      players: ['7gg1n2smCT2kkiwaAAAA']
    }
  });
});
