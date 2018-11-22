import generateAsyncReducer from './generate-async-reducer';

describe('Generate reducer', () => {
  test('is instantiated', () => {
    const actionCreators = generateAsyncReducer('users', () => {/* MOCKED */});

    expect(actionCreators).toBeDefined();
    expect(typeof actionCreators).toEqual('object');
  });

  test('should return action creators', () => {
    const actionCreators = generateAsyncReducer('users', () => {/* MOCKED */});

    expect(actionCreators.get).toBeDefined();
    expect(typeof actionCreators.get).toEqual('function');
    expect(actionCreators.get().type).toEqual('GET_USERS_START');

    expect(actionCreators.reset).toBeDefined();
    expect(typeof actionCreators.reset).toEqual('function');
    expect(actionCreators.reset().type).toEqual('RESET_USERS');
  });
});
