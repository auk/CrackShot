import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';

import * as actions from "../actions/userActions";
import * as selectors from '../selectors';
import { createError, objectStore } from 'utils/utils';
import { CURRENT_USER } from 'constants/utils';

export const userWatcherSaga = [
  takeLatest(actions.deleteUser.toString(), deleteUser),
  takeLatest(actions.updateUser.toString(), updateUser),
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
    yield put(actions.fetchUsersError(createError(error)));
  }
}

export function* fetchCurrentUser() {
  try {
    const url = yield select(selectors.getCurrentUserUrl);
    const response = yield call(callApi, { url, });
    yield put(actions.fetchCurrentUserSuccess(response.data));
    objectStore.set(CURRENT_USER, response.data);
  } catch (error) {
    yield put(actions.fetchCurrentUserError(createError(error)));
  }
}

export function* deleteUser({payload}) {
  yield call(deleteUserRequest, { payload });

  const requestParams = yield select(selectors.getUsersParams);
  yield put(actions.fetchUsers(requestParams));
}

export function* deleteUserRequest({payload}) {
  try {
    const url = yield select(selectors.getDeleteUserUrl);
    const config = {
      method: 'DELETE',
    }

    console.log("Deleting user with uid:", payload);
    const response = yield call(callApi, {
      url: url.replace(/:uid/i, payload),
      config
    });

    yield put(actions.deleteUserSuccess(response.data));
  } catch (error) {
    yield put(actions.deleteUserError(createError(error)));
  }
}

export function* updateUser({payload}) {
  yield call(updateUserRequest, { payload });

  const requestParams = yield select(selectors.getUsersParams);
  yield call(fetchUsers, { payload: requestParams });
}

export function* updateUserRequest({payload}) {
  try {
    const url = yield select(selectors.updateUserUrl);
    console.log("updateUserRequest - url:", url, ", values: ", payload);

    const config = {
      method: 'PUT',
      params: {
        name: payload.name,
        username: payload.username,
        email: payload.email,
        phone: payload.phone,
      }
    }
    console.log("config:", config);

    const response = yield call(callApi, {
      url: url.replace(/:uid/i, payload.id),
      config,
    });
    // console.log("createOrganization - response:", response);

    yield put(actions.updateUserSuccess(response.data));
    toastr.success('Success', 'User information has been updated');
  } catch (error) {
    yield put(actions.updateUserError(createError(error)));
  }
}