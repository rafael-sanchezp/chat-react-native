import { loginService, signUpService, updateUserService, usersService } from '../services'
import { loading, loadingScroll, getUsers, getUsersSearch, currentUser, LOGIN, SIGNUP, UPDATE_USER, LOGOUT, USERS, UPDATE_USERS_SEARCH, clearUser } from '../ActionTypes'
import { delay, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { showMessage, hideMessage } from "react-native-flash-message";
function* loginConfig(data) {
  yield put(loading(true));
  try {
    const res = yield call(loginService, data.user)// request data
    yield put(currentUser(res.data.Login));//dispatch object user
    yield put(loading(false));//hide spiner
  } catch (error) {
    console.log(error)
    yield put(loading(false));//hide spiner
    yield showMessage({ message: `Data incorrect`, type: "warning" });//send message error
  }
}
function* signUpConfig(data) {
  yield put(loading(true));
  try {
    const res = yield call(signUpService, data.user)// request data
    yield put(currentUser(res.data.SignUp));//dispatch object user
    yield put(loading(false));//hide spiner
  } catch (error) {
    console.log(error)
    yield put(loading(false));//hide spiner
    yield showMessage({ message: `Data incorrect`, type: "warning" });//send message error
  }
}
function* updateUserConfig(data) {
  yield put(loading(true));
  try {
    const res = yield call(updateUserService, data.user)// request data
    yield put(currentUser(res.data.UpdateUser));//dispatch object user
    yield put(loading(false));//hide spiner
    yield showMessage({ message: `Data update`, type: "success" });//send message error
  } catch (error) {
    console.log(error)
    yield put(loading(false));//hide spiner
    yield showMessage({ message: `Data incorrect`, type: "warning" });//send message error
  }
}
function* usersConfig(data) {
  yield put(loadingScroll(true));
  try {
    const res = yield call(usersService,data.user.id)// request data
    yield put(getUsers(res.data.getUsers));//dispatch object user
    yield put(getUsersSearch(res.data.getUsers));//dispatch object user for search
    yield put(loadingScroll(false));//hide spiner
  } catch (error) {
    console.log(error)
    yield put(loadingScroll(false));//hide spiner
    //yield showMessage({ message: `Data incorrect`, type: "warning" });//send message error
  }
}
function* updateSearchConfig(data) {

  yield put(getUsersSearch(data.users));//dispatch object user for search
}
function* clearSessionConfig() {
  yield put(clearUser());//dispatch object user
}
function* loginSaga() {
  yield takeLatest(LOGIN, loginConfig);
}
function* signUp() {
  yield takeLatest(SIGNUP, signUpConfig);
}
function* updateUser() {
  yield takeLatest(UPDATE_USER, updateUserConfig);
}
function* logout() {
  yield takeLatest(LOGOUT, clearSessionConfig);
}
function* users() {
  yield takeLatest(USERS, usersConfig);
}

function* updateUsersSearch() {
  yield takeLatest(UPDATE_USERS_SEARCH, updateSearchConfig);
}
export { loginSaga, signUp, updateUser, logout, users, updateUsersSearch }
