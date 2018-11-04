import Reducer from './reducer';

describe('Reducer', () => {
	test('can be instantiated', () => {
		expect(new Reducer('test', {})).toBeDefined();
		expect(new Reducer('test', {})).toBeInstanceOf(Reducer);
	});

	test('should be able to add sync action', () => {
    const usersReducer = new Reducer('users', {});
        
    // Add sync action
    usersReducer.addAction('addUser', (state:any, action:any) => state);

    const actionCreators = usersReducer.getActionCreators();
    const actionHandlers = usersReducer.getActionHandlers();

    expect(typeof actionCreators).toEqual('object');
    expect(Object.keys(actionCreators).length).toBe(1);
    expect(typeof actionCreators.addUser).toEqual('function');

    expect(typeof actionHandlers).toEqual('object');
    expect(Object.keys(actionHandlers).length).toBe(1);
    expect(typeof actionHandlers.ADD_USER).toEqual('function');
	});


  test('should be able to add async action', () => {
    const usersReducer = new Reducer('users', {});
        
    // Add async action
    usersReducer.addAsyncAction('getUsers', () => { /*MOCKED*/ }, {
      error: (state:any, action:any) => state,
      start: (state:any, action:any) => state,
      success: (state:any, action:any) => state,
    });

    const actionCreators = usersReducer.getActionCreators();
    const actionHandlers = usersReducer.getActionHandlers();

    expect(typeof actionCreators).toEqual('object');
    expect(Object.keys(actionCreators).length).toEqual(1);
    expect(typeof actionCreators.getUsers).toEqual('function');

    expect(typeof actionHandlers).toEqual('object');
    expect(Object.keys(actionHandlers).length).toBe(3);
    expect(typeof actionHandlers.GET_USERS_START).toEqual('function');
    expect(typeof actionHandlers.GET_USERS_ERROR).toEqual('function');
    expect(typeof actionHandlers.GET_USERS_SUCCESS).toEqual('function');
  });
  
  test('should be able to get reducer function', () => {
    const usersReducer = new Reducer('users', {});
    
    const reducerFunction = usersReducer.getReducerFunction();
    expect(typeof reducerFunction).toEqual('function');
  });
  
  test('should returned immutable state', () => {
    const counterReducer = new Reducer('counter', { value: 0 });

    counterReducer.addAction('increase', (state:any, action:any) => {
      return {
        value: state.value + 1,
      };
    });
    counterReducer.addAction('decrease', (state:any, action:any) => {
      return {
        value: state.value - 1,
      };
    });
    
    const actionCreators = counterReducer.getActionCreators();
    const reducerFunction = counterReducer.getReducerFunction();

    const stateAfterIncrease = reducerFunction({ value: 0 }, actionCreators.increase());
    const stateAfterSecondIncrease = reducerFunction(stateAfterIncrease, actionCreators.increase());

    expect(stateAfterIncrease.value).toEqual(1);
    expect(stateAfterSecondIncrease.value).toEqual(2);

    const stateAfterDecrease = reducerFunction({ value: 0 }, actionCreators.decrease());

    expect(stateAfterDecrease.value).toEqual(-1);
	});
});