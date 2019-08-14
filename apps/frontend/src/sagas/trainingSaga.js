import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';
import { createError } from 'utils/utils';

import * as actions from "../actions/trainingActions";
import * as selectors from '../selectors';

export const trainingWatcherSaga = [
  takeLatest(actions.createTraining.toString(), createTraining),
  takeLatest(actions.fetchTraining.toString(), fetchTraining),
  takeLatest(actions.fetchTrainings.toString(), fetchTrainings),
  takeLatest(actions.createTrainingStage.toString(), createTrainingStage),
  takeLatest(actions.fetchTrainingStages.toString(), fetchTrainingStages),
];

export function* createTraining({payload}) {
  yield call(createTrainingRequest, { payload });

  // refetch data for list
  const requestParams = yield select(selectors.getTrainingsParams);
  yield put(actions.fetchTrainings({ payload: requestParams }));
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
    if (payload.participate) {
      Object.assign(params, { shots: payload.shots });
      Object.assign(params, { cost: payload.cost });
    }
    
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

export function* fetchTraining({payload}) {
  const id = payload;
  try {
    const url = yield select(selectors.getTrainingUrl);
    const config = { params: { id: id } };
    const response = yield call(callApi, { url: url.replace(/:tid/i, id), config, });
    
    const action = actions.fetchTrainingSuccess({ ...response.data });
    yield put(action);
  } catch (error) {
    console.error("Fetch training error: ", error, "action:", createError(error))
    yield put(actions.fetchTrainingError(createError(error)));
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
    // console.log("Error action:", createError(error))
    yield put(actions.fetchTrainingsError(createError(error)));
  }
}

export function* createTrainingStage({ payload }) {
  try {
    const tid = payload.trainingId;
    console.assert(tid);

    const url = yield select(selectors.createTrainingStageUrl);
    console.log("createTraining stage - url:", url, ", values: ", payload);

    let params = { name: payload.name };
    if (payload.element)
      Object.assign(params, { elems: payload.element.map(u => u.value) });
    if (payload.shots)
      Object.assign(params, { shots: payload.shots });

    const config = {
      method: 'POST',
      params: params
    }
    console.log("config:", config);

    const response = yield call(callApi, {
      url: url.replace(/:tid/i, tid),
      config,
    });

    yield put(actions.createTrainingStageSuccess(response.data));
    toastr.success('Success', 'Training stage has been created');    
  } catch (error) {
    console.error("Create training error:", error);
    yield put(actions.createTrainingStageError(createError(error)));
  }
}

export function* fetchTrainingStages({ payload }) {
  const id = payload.params;
  const pageable = payload.pageable;

  console.log("fetchTrainingStages: payload {}", payload);
  console.log("fetchTrainingStages: {}", payload.pageable);

  try {
    const url = yield select(selectors.getTrainingStagesUrl);

    const config = { method: 'GET', params: { ...pageable } };
    const response = yield call(callApi, { url: url.replace(/:tid/i, id), config, });
    console.log('fetchTrainingStages: response=', response.data);
    
    const action = actions.fetchTrainingStagesSuccess({ ...response.data, requestParams: payload.requestParams });
    // console.log("fetchTrainingStages success action:", action);
    yield put(action);
  } catch (error) {
    // console.log("Error action:", createError(error))
    yield put(actions.fetchTrainingStagesError(createError(error)));
  }
}