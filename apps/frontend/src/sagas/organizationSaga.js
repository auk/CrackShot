import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';
import { createError } from 'utils/utils';

import * as actions from "../actions/organizationActions";
import * as selectors from '../selectors';

export const organizationWatcherSaga = [
  takeLatest(actions.createOrganization.toString(), createOrganization),
  takeLatest(actions.fetchOrganizations.toString(), fetchOrganizations),
  takeLatest(actions.fetchOrganization.toString(), fetchOrganization),
  takeLatest(actions.updateOrganization.toString(), updateOrganization),
];

export function* createOrganization({payload}) {
  try {
    const url = yield select(selectors.createOrganizationUrl);
    // console.log("createOrganization - url:", url, ", values: ", payload);
    const config = {
      method: 'POST',
      params: {
        address: payload.address,
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

    // refetch data for list
    const requestParams = yield select(selectors.getOrganizationsParams);
    yield put(actions.fetchOrganizations(requestParams));
    
  } catch (error) {
    console.error("Create organization error:", error);
    yield put(actions.createOrganizationError(createError(error)));
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
    yield put(actions.fetchOrganizationsError(createError(error)));
  }
}

export function* fetchOrganization({payload}) {
  const oid = payload;
  try {
    const url = yield select(selectors.getOrganizationUrl);
    const config = { params: { id: oid } };
    const response = yield call(callApi, { url: url.replace(/:oid/i, oid), config, });
    
    const action = actions.fetchOrganizationSuccess({ ...response.data });
    yield put(action);
  } catch (error) {
    console.error("Fetch organization error: ", error)
    yield put(actions.fetchOrganizationError(createError(error)));
  }
}

export function* updateOrganization({payload}) {
  yield call(updateOrganizationRequest, { payload });

  const requestParams = yield select(selectors.getOrganizationsParams);
  yield call(fetchOrganizations, { payload: requestParams });
}

export function* updateOrganizationRequest({payload}) {
  try {
    const url = yield select(selectors.updateOrganizationUrl);
    console.log("updateOrganizationRequest - url:", url, ", values: ", payload);

    const config = {
      method: 'PUT',
      params: {
        address: payload.address,
        name: payload.name,
        web: payload.web,
        email: payload.email,
        phone: payload.phone,
      }
    }
    console.log("config:", config);

    const response = yield call(callApi, {
      url: url.replace(/:oid/i, payload.id),
      config,
    });
    // console.log("createOrganization - response:", response);

    yield put(actions.updateOrganizationSuccess(response.data));
    toastr.success('Success', 'Organization has been updated');
  } catch (error) {
    yield put(actions.updateOrganizationError(createError(error)));
  }
}