import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';

import * as actions from "../actions/organizationActions";
import * as selectors from '../selectors';

export const organizationWatcherSaga = [
  takeLatest(actions.createOrganization.toString(), createOrganization),
  takeLatest(actions.fetchOrganizations.toString(), fetchOrganizations),
];

export function* createOrganization({ values, router }) {
  try {

    const url = yield select(selectors.createOrganizationUrl);
    const config = {
      method: 'POST',
      params: {
        name: values.name,
        email: values.email,
        phone: values.phone,
      }
    }

    const response = yield call(callApi, {
      url: url,
      config,
    });

    yield put(actions.createOrganizationSuccess(response.data));
    toastr.success('Success', 'Timeentry has been created');
  } catch (error) {
    yield put(actions.createOrganizationError(error));
  }
}

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