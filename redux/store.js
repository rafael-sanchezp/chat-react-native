import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers'

import createSagaMiddleware from 'redux-saga';

// importing your root saga
import dataSaga from './sagas';
const sagaMiddleware = createSagaMiddleware();

// Redux: Store
const store = createStore(
  reducers,
  applyMiddleware(
    sagaMiddleware,
    createLogger(),
  ),
);
// Middleware: Redux Saga
sagaMiddleware.run(dataSaga);
// Exports
export {
  store
}