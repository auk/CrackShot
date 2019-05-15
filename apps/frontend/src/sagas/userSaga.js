import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';

import * as actions from "../actions/userActions";
import * as selectors from '../selectors';

export const userWatcherSaga = [
  takeLatest(actions.fetchUsers.toString(), fetchUsers),
];

export function* fetchUsers({requestParams}) {
  try {
    const url = yield select(selectors.getUsersUrl);
    // console.log('fetchOrganizations requestParams:', requestParams);

    const config = { params: { ...requestParams } };
    const response = yield call(callApi, { url, config, });
    // console.log('fetchOrganizations: response=', response.data);
    
    const action = actions.fetchUsersSuccess({ ...response.data, requestParams: requestParams });
    // console.log("Fetch organization success action:", action);
    yield put(action);
  } catch (error) {
    yield put(actions.fetchUsersError(error.response ? error.response.data : error));
  }
}