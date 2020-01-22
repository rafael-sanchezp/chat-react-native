import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
/*redux configuration*/
//import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import FlashMessage from "react-native-flash-message";
//app views and components
import App from './index';
import { store } from "./redux/store";
export const persistor = persistStore(store);

export default class toTravel extends Component {
  
  render () {
    return (
        <Provider store={store}>
            <App/>
              <FlashMessage position="top" />
        </Provider>
    )
  }
}

AppRegistry.registerComponent('toTravel', () => toTravel);
