import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';

import * as actions from "../actions/organizationActions";
import * as selectors from '../selectors';

export const organizationWatcherSaga = [
  takeLatest(actions.createOrganization.toString(), createOrganization),
  takeLatest(actions.fetchOrganizations.toString(), fetchOrganizations),
];

export function* createOrganization({payload}) {
  try {
    const url = yield select(selectors.createOrganizationUrl);
    // console.log("createOrganization - url:", url, ", values: ", payload);
    const config = {
      method: 'POST',
      params: {
        name: payload.name,
        web: payload.web,
        email: payload.email,
        phone: payload.phone,
      }
    }
    // console.log("config:", config);

    const response = yield call(callApi, {
      url: url,
      config,
    });
    // console.log("createOrganization - response:", response);

    yield put(actions.createOrganizationSuccess(response.data));
    toastr.success('Success', 'Timeentry has been created');
  } catch (error) {
    console.error("Create organization error:", error);
    yield put(actions.createOrganizationError(error));
  }
}

export function* fetchOrganizations({requestParams}) {
  try {
    const url = yield select(selectors.getOrganizationsUrl);
    // console.log('fetchOrganizations requestParams:', requestParams);

    const config = { params: { ...requestParams } };
    const response = yield call(callApi, { url, config, });
    // console.log('fetchOrganizations: response=', response.data);
    
    const action = actions.fetchOrganizationsSuccess({ ...response.data, requestParams: requestParams });
    // console.log("Fetch organization success action:", action);
    yield put(action);
  } catch (error) {
    yield put(actions.fetchOrganizationsError(error.response ? error.response.data : error));
  }
}