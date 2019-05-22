import { takeLatest, call, put, select } from 'redux-saga/effects';
// import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';

import * as actions from "../actions/userActions";
import * as selectors from '../selectors';
import { objectStore } from 'utils/utils';
import { CURRENT_USER } from 'constants/utils';

export const userWatcherSaga = [
  takeLatest(actions.fetchUsers.toString(), fetchUsers),
  takeLatest(actions.fetchCurrentUser.toString(), fetchCurrentUser),
];

export function* fetchUsers({requestParams}) {
  try {
    const url = yield select(selectors.getUsersUrl);
    const config = { params: { ...requestParams } };
    const response = yield call(callApi, { url, config, });    
    yield put(actions.fetchUsersSuccess({ ...response.data, requestParams: requestParams }));
  } catch (error) {
    yield put(actions.fetchUsersError(error.response ? error.response.data : error));
  }
}

export function* fetchCurrentUser() {
  try {
    const url = yield select(selectors.getCurrentUserUrl);
    const response = yield call(callApi, { url, });
    yield put(actions.fetchCurrentUserSuccess(response.data));
    objectStore.set(CURRENT_USER, response.data);
  } catch (error) {
    yield put(actions.fetchCurrentUserError(error.response ? error.response.data : error));
  }
}