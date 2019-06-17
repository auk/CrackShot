import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';
import { createError } from 'utils/utils';

import * as actions from "../actions/trainingActions";
import * as selectors from '../selectors';

export const trainingWatcherSaga = [
  takeLatest(actions.createTraining.toString(), createTraining),
  takeLatest(actions.createTrainingElement.toString(), createTrainingElement),
  takeLatest(actions.deleteTrainingElement.toString(), deleteTrainingElement),
  takeLatest(actions.fetchTrainings.toString(), fetchTrainings),
  takeLatest(actions.fetchTrainingElements.toString(), fetchTrainingElements),
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
      date: payload.requestParams.date.format('YYYY-MM-DD'),
    };
    if (payload.requestParams.organization)
      Object.assign(params, { oid: payload.requestParams.organization.value });
    if (payload.requestParams.time)
      Object.assign(params, { time: payload.requestParams.time.format('HH:mm') });
    if (payload.requestParams.user)
      Object.assign(params, { users: payload.requestParams.user.map(u => u.value) });

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

export function* createTrainingElement({payload}) {
  yield call(createTrainingElementRequest, { payload });
  
  const requestParams = yield select(selectors.getTrainingElementsRequestParams);
  yield call(fetchTrainingElements, { payload: requestParams });
}

export function* createTrainingElementRequest({payload}) {
  try {
    const url = yield select(selectors.createTrainingElementUrl);
    console.log("createTrainingElement - url:", url, ", values: ", payload);

    const config = {
      method: 'POST',
      params: {
        name: payload.requestParams.name
      }
    }
    console.log("config:", config);

    const response = yield call(callApi, {
      url: url,
      config,
    });
    // console.log("createOrganization - response:", response);

    yield put(actions.createTrainingElementSuccess(response.data));
    toastr.success('Success', 'Training element has been created');
  } catch (error) {
    yield put(actions.createTrainingElementError(createError(error)));
  }
}

export function* deleteTrainingElement({ payload }) {
  try {
    const url = yield select(selectors.deleteTrainingElementUrl);
    const config = {
      method: 'DELETE',
    }

    console.log("Deleting training element with uid:", payload);
    const response = yield call(callApi, {
      url: url.replace(/:tid/i, payload),
      config
    });

    yield put(actions.deleteTrainingElementSuccess(response.data));

    //refetch users after delete
    // const requestParams = yield select(selectors.getTrainingElementsParams);
    // yield put(actions.fetchTrainingElements(requestParams));
  } catch (error) {
    const e = createError(error);
    yield put(actions.deleteTrainingElementError(e));
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

export function* fetchTrainingElements({ payload: { requestParams } }) {
  try {
    const url = yield select(selectors.getTrainingElementsUrl);
    console.log('fetchTrainingElements requestParams:', requestParams);

    const config = { method: 'GET', params: { ...requestParams } };
    const response = yield call(callApi, { url, config, });
    // console.log('fetchTrainings: response=', response.data);
    
    const action = actions.fetchTrainingElementsSuccess({ ...response.data, requestParams: requestParams });
    // console.log("fetchTrainings success action:", action);
    yield put(action);
  } catch (error) {
    yield put(actions.fetchTrainingElementsError(createError(error)));
  }
}
