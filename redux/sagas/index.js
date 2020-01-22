import { all, fork} from 'redux-saga/effects';
// Imports: Redux Sagas
import { loginSaga,signUp,updateUser,logout,users,updateUsersSearch} from './user';
import {dataMessages,sendMessage} from './message';
// Redux Saga: Root Saga
export  default function* rootSaga () {
  yield all([
    fork(loginSaga),
    fork(signUp),
    fork(updateUser),
    fork(logout),
    fork(users),
    fork(updateUsersSearch),
    fork(dataMessages),
    fork(sendMessage),
    
  ]);
};