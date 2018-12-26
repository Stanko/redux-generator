import { call, put, takeLatest } from 'redux-saga/effects';

import { IAction } from './reducer';

export interface IAsyncActionTypesMap { 
  start: string,
  error: string,
  success: string,
};

const createSaga = (asyncMethod:any, actionTypes:IAsyncActionTypesMap, effect:any = takeLatest) => {
  function* getData(action:IAction) {
    try {
      const data = yield call(asyncMethod, action);
      yield put({ 
        data, 
        params: action.params,
        type: actionTypes.success, 
      });
    } catch (error) {
      yield put({ 
        error, 
        params: action.params,
        type: actionTypes.error,
      });
    }
  }
  
  return function* watchGetData() {
    yield effect(actionTypes.start, getData);
  }
}

export default createSaga;