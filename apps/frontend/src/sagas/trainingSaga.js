import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';
import { createError } from 'utils/utils';

import * as actions from "../actions/trainingActions";
import * as selectors from '../selectors';

export const trainingWatcherSaga = [
  takeLatest(actions.createTraining.toString(), createTraining),
  takeLatest(actions.fetchTrainings.toString(), fetchTrainings),
  // takeLatest(actions.fetchTraining.toString(), fetchTraining),
];

export function* createTraining({payload}) {
  yield call(createTrainingRequest, { payload });

  // refetch data for list
  const requestParams = yield select(selectors.getTrainingsParams);
  yield call(actions.fetchTrainings, { payload: requestParams } );
}

export function* createTrainingRequest({payload}) {
  try {
    const url = yield select(selectors.createTrainingUrl);
    console.log("createTraining - url:", url, ", values: ", payload);

    let params = {
      date: payload.date.format('YYYY-MM-DD'),
    };
    if (payload.organization)
      Object.assign(params, { oid: payload.organization.value });
    if (payload.time)
      Object.assign(params, { time: payload.time.format('HH:mm') });
    if (payload.user)
      Object.assign(params, { users: payload.user.map(u => u.value) });
      if (payload.element)
      Object.assign(params, { elems: payload.element.map(u => u.value) });

    const config = {
      method: 'POST',
      params: params
    }
    console.log("config:", config);

    const response = yield call(callApi, {
      url: url,
      config,
    });
    // console.log("createOrganization - response:", response);

    yield put(actions.createTrainingSuccess(response.data));
    toastr.success('Success', 'Training has been created');    
  } catch (error) {
    console.error("Create training error:", error);
    yield put(actions.createTrainingError(createError(error)));
  }
}

export function* fetchTrainings({ payload: { requestParams } }) {
  try {
    const url = yield select(selectors.getTrainingsUrl);
    console.log('fetchTrainings requestParams:', requestParams);

    const config = { method: 'POST', params: { ...requestParams } };
    const response = yield call(callApi, { url, config, });
    // console.log('fetchTrainings: response=', response.data);
    
    const action = actions.fetchTrainingsSuccess({ ...response.data, requestParams: requestParams });
    // console.log("fetchTrainings success action:", action);
    yield put(action);
  } catch (error) {
    yield put(actions.fetchTrainingsError(createError(error)));
  }
}