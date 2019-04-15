import { takeLatest, call, put, select } from "redux-saga/effects";

import * as TYPES from 'constants/actions';
import * as actions from 'actions/authActions';
import * as selectors from 'selectors';
import { ID_TOKEN } from 'constants/utils';
import { authApi } from 'utils/ApiUtils';
import { decodeUserProfile } from 'utils/utils';

export const authWatcherSaga = [
  takeLatest(TYPES.LOGIN_REQUEST, login),
  takeLatest(TYPES.LOGOUT_REQUEST, logout),
  takeLatest(TYPES.CHECK_PERMISSION, checkPermission),
];

export function* login({ values, history }) {
  try {
    const url = yield select(selectors.getAuthUrl);
    const config = {
      method: 'POST',
      params: {
        grant_type: "password",
        ...values,
      },
    };

    const response = yield call(authApi, { url, config, });
    
    const idToken = response.data[ID_TOKEN];
    const profile = decodeUserProfile(idToken);
    
    localStorage.setItem(ID_TOKEN, idToken);
    yield put(actions.loginSuccess(profile));

    //Redirect
    const params = new URLSearchParams(history.location.search);
    const redirectPath = params.get('redirect');
    history.push(redirectPath ? redirectPath : '/');
  } catch (error) {
    localStorage.removeItem(ID_TOKEN);
    yield put(actions.loginFailure(error));
  }
}

export function* logout() {
  try {
    localStorage.removeItem(ID_TOKEN);
    yield put(actions.logoutSuccess());
  } catch (error) {
    yield put(actions.logoutFailure(error));
  }
}

export function* checkPermission({ userRoles, availableRoles }) {
  try {
    let userIsAdmin = false;
    for (let i = 0; i < userRoles.length; i++) {
      if (availableRoles.includes(userRoles[i])) {
        userIsAdmin = true;
        break;
      }
    }

    yield put(actions.changeStatus(userIsAdmin));
  } catch (error) {
    // console.error('Cannot change user status: ', error);
  }
}