import reducers from '../reducers';

test('reducers', () => {
  const state = reducers(
    { onlinePlayers: 0 },
    { type: 'SET_ONLINE_PLAYERS', payload: 1 }
  );
  expect(state).toEqual({ onlinePlayers: 1 });
});
