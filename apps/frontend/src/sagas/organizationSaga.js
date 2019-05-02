import { takeLatest, call, put, select } from 'redux-saga/effects';

import { callApi } from 'utils/ApiUtils';

import * as actions from "../actions/organizationActions";
import * as selectors from '../selectors';

export const configWatcherSaga = [
  takeLatest(actions.fetchOrganizations.toString(), fetchOrganizations),
];

export function* fetchOrganizations({requestParams}) {
  try {
    const url = yield select(selectors.getOrganizationsUrl);
    const config = { params: { ...requestParams } };
    const response = yield call(callApi, { url, config, });
    const content = [
      { id: 1, name: 'Organization 1' },
      { id: 2, name: 'Organization 2' }
    ];
    const response = { content: content, pageable: {}, sort: {}, numberOfElements: 2, first: true, empty: false };
    yield put(actions.fetchOrganizationsSuccess({ response/*...response.data*/, requestParams }));
  } catch (error) {
    yield put(actions.fetchOrganizationsError(error));
  }
}
