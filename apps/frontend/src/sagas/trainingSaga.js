import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';
import { createError } from 'utils/utils';

import * as actions from "../actions/trainingActions";
import * as selectors from '../selectors';

export const trainingWatcherSaga = [
  takeLatest(actions.createTraining.toString(), createTraining),
  takeLatest(actions.deleteTraining.toString(), deleteTraining),
  takeLatest(actions.fetchTraining.toString(), fetchTraining),
  takeLatest(actions.fetchTrainings.toString(), fetchTrainings),
  takeLatest(actions.createTrainingStage.toString(), createTrainingStage),
  takeLatest(actions.deleteTrainingStage.toString(), deleteTrainingStage),
  takeLatest(actions.updateTrainingStage.toString(), updateTrainingStage),
  takeLatest(actions.fetchTrainingStages.toString(), fetchTrainingStages),
];

// Training

export function* createTraining({payload}) {
  yield call(createTrainingRequest, { payload });

  // refetch data for list
  const requestParams = yield select(selectors.getTrainingsParams);
  yield put(actions.fetchTrainings({ payload: requestParams }));
}

export function* createTrainingRequest({payload}) {
  try {
    const url = yield select(selectors.createTrainingUrl);
    // console.log("createTraining - url:", url, ", values: ", payload);

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
    // console.log("config:", config);

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

export function* deleteTraining({payload}) {
  /* auk: TODO 
  console.log("deleteTraining - payload: ", payload);
  yield call(deleteTrainingRequest, { payload });

  // refetch data for list
  const tid = payload.trainingId;
  console.assert(tid, "Training ID must me defined");

  const requestParams = yield select(selectors.getTrainingParamsSelector);
  yield put(actions.fetchTrainings(requestParams));
  */
}

export function* fetchTraining({payload}) {
  const id = payload;
  try {
    const url = yield select(selectors.getTrainingUrl);
    // const config = { params: { id: id } };
    const response = yield call(callApi, { url: url.replace(/:tid/i, id) });

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
    // console.log('fetchTrainings requestParams:', requestParams);

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

// Training stage

export function* createTrainingStage({ payload }) {
  yield call(createTrainingStageRequest, { payload });

  // refetch data for list
  const tid = payload.trainingId;
  yield put(actions.fetchTraining(tid));

  const requestParams = yield select(selectors.getTrainingStagesParamsSelector);
  yield put(actions.fetchTrainingStages(tid, requestParams));
}

const trainingStageToRequestParams = (payload) => {
  let params = { name: payload.name };
  if (payload.element)
    Object.assign(params, { elems: payload.element.map(u => u.value) });
  if (payload.shots)
    Object.assign(params, { shots: payload.shots });
  return params;
}

function* createTrainingStageRequest({ payload }) {
  try {
    const url = yield select(selectors.createTrainingStageUrl);
    // console.log("createTrainingStage - url:", url, ", payload: ", payload);

    const tid = payload.trainingId;
    console.assert(tid);

    const config = {
      method: 'POST',
      params: trainingStageToRequestParams(payload)
    }
    // console.log("config:", config);

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

export function* deleteTrainingStage({ payload }) {
  // console.log("deleteTrainingStage - payload: ", payload);
  yield call(deleteTrainingStageRequest, { payload });

  // refetch data for list
  const tid = payload.trainingId;
  console.assert(tid, "Training ID must me defined");

  const requestParams = yield select(selectors.getTrainingStagesParamsSelector);
  yield put(actions.fetchTrainingStages(tid, requestParams));
}

function* deleteTrainingStageRequest({ payload }) {
  try {
    const url = yield select(selectors.deleteTrainingStageUrl);
    console.log("deleteTrainingStageUrl - url:", url);

    const tid = payload.trainingId;
    console.assert(tid, "Training ID must me defined");

    const sid = payload.stageId;
    console.assert(sid, "Stage ID must me defined");

    const config = {
      method: 'DELETE',
    }

    const response = yield call(callApi, {
      url: url.replace(/:tid/i, tid).replace(/:sid/i, sid),
      config,
    });

    yield put(actions.deleteTrainingStageSuccess(response.data));
    toastr.success('Success', 'Training stage has been deleted');
  } catch (error) {
    yield put(actions.deleteTrainingStageError(createError(error)));
  }
}

export function* updateTrainingStage({ payload }) {
  yield call(updateTrainingStageRequest, { payload });

  // refetch data for list
  const tid = payload.trainingId;
  yield put(actions.fetchTraining(tid));

  const requestParams = yield select(selectors.getTrainingStagesParamsSelector);
  yield put(actions.fetchTrainingStages(tid, requestParams));
}

export function* updateTrainingStageRequest({payload}) {
  try {
    const url = yield select(selectors.updateTrainingStageUrl);
    // console.log("updateTrainingStage - url:", url, ", payload: ", payload);

    const id = payload.id;
    console.assert(id, "Stage ID must me defined");

    const tid = payload.trainingId;
    console.assert(tid, "Training ID must me defined");

    const config = {
      method: 'PUT',
      params: trainingStageToRequestParams(payload)
    }
    // console.log("config:", config);

    const response = yield call(callApi, {
      url: url.replace(/:tid/i, tid).replace(/:sid/i, id),
      config,
    });

    yield put(actions.updateTrainingStageSuccess(response.data));
    toastr.success('Success', 'Training stage has been updated');
  } catch (error) {
    yield put(actions.updateTrainingStageError(createError(error)));
  }
}

// Training stages

export function* fetchTrainingStages({ payload }) {
  const id = payload.params;
  const pageable = payload.pageable;

  // console.log("fetchTrainingStages: payload", payload);
  // console.log("fetchTrainingStages:", pageable);

  try {
    const url = yield select(selectors.getTrainingStagesUrl);

    const config = { method: 'GET', params: { ...pageable } };
    const response = yield call(callApi, { url: url.replace(/:tid/i, id), config, });
    // console.log('fetchTrainingStages: response=', response.data);

    const action = actions.fetchTrainingStagesSuccess({ ...response.data, requestParams: payload.requestParams });
    // console.log("fetchTrainingStages success action:", action);
    yield put(action);
  } catch (error) {
    // console.log("Error action:", createError(error))
    yield put(actions.fetchTrainingStagesError(createError(error)));
  }
}