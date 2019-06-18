import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';
import { createError } from 'utils/utils';

import * as actions from "../actions/trainingActions";
import * as selectors from '../selectors';

export const trainingElementWatcherSaga = [
  takeLatest(actions.createTrainingElement.toString(), createTrainingElement),
  takeLatest(actions.deleteTrainingElement.toString(), deleteTrainingElement),
  takeLatest(actions.updateTrainingElement.toString(), updateTrainingElement),

  takeLatest(actions.fetchTrainingElements.toString(), fetchTrainingElements),
];

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
  yield call(deleteTrainingElementRequest, { payload });

  const requestParams = yield select(selectors.getTrainingElementsRequestParams);
  yield call(fetchTrainingElements, { payload: requestParams });
}

export function* deleteTrainingElementRequest({ payload }) {
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

/*export function* fetchTrainingElement(action) {
  try {
    const url = yield select(selectors.getTrainingElementUrl);
    console.log('fetchTrainingElement url:', url, ", action: ", action);

    const config = { method: 'GET', params: { id: action } };
    const response = yield call(callApi, { url, config, });

    put(actions.fetchTrainingElementSuccess({ ...response.data }));
  } catch (error) {
    yield put(actions.fetchTrainingsError(createError(error)));
  }
}*/

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

export function* updateTrainingElement({payload}) {
  yield call(updateTrainingElementRequest, { payload });
  
  const requestParams = yield select(selectors.getTrainingElementsRequestParams);
  yield call(fetchTrainingElements, { payload: requestParams });
}

export function* updateTrainingElementRequest({payload}) {
  try {
    const url = yield select(selectors.updateTrainingElementUrl);
    console.log("updateTrainingElementRequest - url:", url, ", values: ", payload);

    const config = {
      method: 'PUT',
      params: {
        id: payload.requestParams.id,
        name: payload.requestParams.name
      }
    }
    console.log("config:", config);

    const response = yield call(callApi, {
      url: url.replace(/:tid/i, payload.requestParams.id),
      config,
    });
    // console.log("createOrganization - response:", response);

    yield put(actions.updateTrainingElementSuccess(response.data));
    toastr.success('Success', 'Training element has been created');
  } catch (error) {
    yield put(actions.updateTrainingElementError(createError(error)));
  }
}