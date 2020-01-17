import { login } from '../services'
import { loading, currentUser} from '../ActionTypes'
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchConfig(data) {
    yield put(loading(true));
  try {
    //const data = yield call(makeRequest,'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=bruno&key=AIzaSyCHsAUodbSKWzzRXI8ZDHYTSV9TdBKB2ZE');
    const res=yield call(login,data.user)
    console.log(res)
    yield put(currentUser(res.data.Login));
    yield put(loading(false));
  } catch (error) {
    console.log(error)
    yield put(loading(false));
  }
}
function* configSaga() {
  yield takeEvery("LOGIN", fetchConfig);
}

export default configSaga;