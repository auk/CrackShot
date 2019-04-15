import { takeLatest, call, put, } from "redux-saga/effects";

import * as TYPES from 'constants/actions';
import * as actions from 'actions/configActions';
import { callApi } from 'utils/ApiUtils';

export const configWatcherSaga = [
  takeLatest(TYPES.FETCH_CONFIG_REQUEST, fetchConfig),
];

/**
 * Fetch app config 
 */
export function* fetchConfig() {
  try {
    const url = `${process.env.PUBLIC_URL}${process.env.NODE_ENV === 'development' ? '/config.dev.json' : '/config.prod.json' }`;

    const response = yield call(callApi, { url, });
    yield put(actions.fetchConfigSuccess(replaceHost(response.data)));
  } catch (error) {
    yield put(actions.fetchConfigFailure(error));
  }
}

function replaceHost(config) {
  const REST_URL = config.services.rest;
  const AUTH_URL = config.services.auth;
  return JSON.parse(JSON.stringify(config).replace(/{REST_URL}/g, REST_URL).replace(/{AUTH_URL}/g, AUTH_URL));
}