import { applyMiddleware, compose, createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import thunk from 'redux-thunk';
const loggerMiddleware = createLogger({ predicate: () => false });
const persistedReducer = persistReducer({ key: 'root', storage, blacklist: ['filter', 'modals'] }, reducers);

function configureStore (initialState) {
  const enhancer = compose(
    applyMiddleware(thunk, loggerMiddleware)
  );
  return createStore(persistedReducer, initialState, enhancer)
}

const initialState = {};
export const store = configureStore(initialState);