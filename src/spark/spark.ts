import Reducer from './reducer';

interface IReducerMap { 
  [key:string]: Reducer,
};

class Spark {
  private reducers:IReducerMap = {};

  // -------- PUBLIC INTERFACE

  /**
   * Save reducer internally. 
   * Called by the reducer itself when it is created.
   *
   * @param reducerName - reducer's name.
   * @param reducer - reducer to be registered.
   */
  public registerReducer(reducerName:string, reducer:Reducer) {
    if (this.reducers[reducerName]) {
      throw new Error(`Redux Spark - reducer "${ reducerName }" already exists.`);
    }

    this.reducers[reducerName] = reducer;
  }

  /**
   * Returns all of the registered reducers, 
   * so they can be used in redux's combineReducers method.
   *
   * @return Map of all registered reducers.
   */
  public getAllReducers():object {
    const reducers = {};

    Object.keys(this.reducers).forEach(reducerName => {
      const reducer = this.reducers[reducerName].getReducerFunction();
      reducers[reducerName] = reducer;
    });

    return reducers;
  }

  /**
   * Returns all of the generated sagas, 
   * so they can be run using saga middleware.
   *
   * @return Array of all generated sagas.
   */
  public getAllSagas():any[] {
    const allSagas:any[] = [];

    Object.keys(this.reducers).forEach(reducerName => {
      const reducerSagas = this.reducers[reducerName].getSagas();
      allSagas.push(...reducerSagas.map(saga => saga()));
    });

    return allSagas;
  }

  // -------- PRIVATE METHODS
}

export default new Spark();
