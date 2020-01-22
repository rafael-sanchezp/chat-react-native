import { createStore, applyMiddleware,compose } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import createSagaMiddleware from 'redux-saga';

// importing your root saga
import rootSaga from './sagas/index';
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();
let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);


sagaMiddleware.run(rootSaga);
export { store, persistor };
/* middlewares.push(sagaMiddleware);
enhancers.push(applyMiddleware(...middlewares));

// Redux: Store
const store = createStore(
  reducers,
  applyMiddleware(
    sagaMiddleware,
    createLogger(),
  ),
);
// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);
// Exports
export {
  store
} */