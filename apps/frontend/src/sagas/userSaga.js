import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';

import * as actions from "../actions/userActions";
import * as selectors from '../selectors';
import { createError, objectStore } from 'utils/utils';
import { CURRENT_USER } from 'constants/utils';

export const userWatcherSaga = [
  takeLatest(actions.fetchCurrentUser.toString(), fetchCurrentUser),
  takeLatest(actions.fetchCurrentUserTrainings.toString(), fetchCurrentUserTrainings),

  takeLatest(actions.fetchUser.toString(), fetchUser),
  takeLatest(actions.deleteUser.toString(), deleteUser),
  takeLatest(actions.updateUser.toString(), updateUser),
  takeLatest(actions.fetchUserTrainings.toString(), fetchUserTrainings),

  takeLatest(actions.fetchUsers.toString(), fetchUsers),
];

export function* fetchUser({payload}) {
  try {
    const url = yield select(selectors.getUserUrl);
    const config = { params: { uid: payload } };
    // console.log("fetchUser - url:", url, ", config: ", config)
    const response = yield call(callApi, { 
      url: url.replace(/:uid/i, payload),
      config
    });
    yield put(actions.fetchUserSuccess(response.data));
  } catch(error) {
    yield put(actions.fetchUserError(createError(error)));
  }
}

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

    // console.log("Deleting user with uid:", payload);
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
    // console.log("updateUserRequest - url:", url, ", values: ", payload);

    const config = {
      method: 'PUT',
      params: {
        name: payload.name,
        username: payload.username,
        email: payload.email,
        phone: payload.phone,
      }
    }
    // console.log("config:", config);

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

export function* fetchCurrentUserTrainings({ requestParams }) {
  try {
    const url = yield select(selectors.getCurrentUserTrainingsUrl);
    const config = { params: { ...requestParams } };
    const response = yield call(callApi, { url, config, });    
    yield put(actions.fetchCurrentUserTrainingsSuccess({ ...response.data, requestParams: requestParams }));
  } catch (error) {
    yield put(actions.fetchCurrentUserTrainingsError(createError(error)));
  }
}

export function* fetchUserTrainings( { payload: { requestParams }}) {
  try {
    const uid = requestParams.uid;
    console.assert(uid);

    const url = yield select(selectors.getUserTrainingsUrl);
    const config = { 
      method: 'POST',
      params: { ...requestParams }
    };

    const response = yield call(callApi, { 
      url: url.replace(/:uid/i, uid),
      config
    });    
    yield put(actions.fetchUserTrainingsSuccess({ ...response.data, requestParams: requestParams }));
  } catch (error) {
    yield put(actions.fetchUserTrainingsError(createError(error)));
  }
}