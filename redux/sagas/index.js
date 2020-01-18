import { all, fork} from 'redux-saga/effects';
// Imports: Redux Sagas
import { loginSaga,signUp,updateUser,logout} from './user';
// Redux Saga: Root Saga
export  default function* rootSaga () {
  yield all([
    fork(loginSaga),
    fork(signUp),
    fork(updateUser),
    fork(logout),
    
  ]);
};