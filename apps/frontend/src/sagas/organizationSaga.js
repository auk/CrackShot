import { takeLatest, call, put, select } from 'redux-saga/effects';

import { callApi } from 'utils/ApiUtils';

import * as actions from "../actions/organizationActions";
import * as selectors from '../selectors';

export const organizationWatcherSaga = [
  takeLatest(actions.fetchOrganizations.toString(), fetchOrganizations),
];

export function* fetchOrganizations({requestParams}) {
  try {
    const url = yield select(selectors.getOrganizationsUrl);
    // console.log('fetchOrganizations url:', url);

    const config = { params: { ...requestParams } };
    const response = yield call(callApi, { url, config, });
    // console.log('fetchOrganizations: response=', response.data);
    
    yield put(actions.fetchOrganizationsSuccess({ ...response.data, requestParams }));
  } catch (error) {
    yield put(actions.fetchOrganizationsError(error.response ? error.response.data : error));
  }
}
