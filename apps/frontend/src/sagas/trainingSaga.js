import { takeLatest, call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { callApi } from 'utils/ApiUtils';
import { createError } from 'utils/utils';

import * as actions from "../actions/trainingActions";
import * as selectors from '../selectors';

export const trainingWatcherSaga = [
  takeLatest(actions.createTraining.toString(), createTraining),
  // takeLatest(actions.fetchTrainings.toString(), fetchTrainings),
  // takeLatest(actions.fetchTraining.toString(), fetchTraining),
];

export function* createTraining({payload}) {
  try {
    const url = yield select(selectors.createTrainingUrl);
    console.log("createTraining - url:", url, ", values: ", payload);
    const config = {
      method: 'POST',
      params: {
        organization: payload.organization,
        date: payload.date,
        users: payload.users,
      }
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