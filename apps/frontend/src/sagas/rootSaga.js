import { all } from "redux-saga/effects";
import { authWatcherSaga } from './authSaga';
import { configWatcherSaga } from './configSaga';
import { localeWatcherSaga } from './localeSaga';
import { organizationWatcherSaga } from './organizationSaga';
import { trainingWatcherSaga } from './trainingSaga';
import { trainingElementWatcherSaga } from './trainingElementSaga';
import { userWatcherSaga } from './userSaga';

export default function* rootSaga() {
  yield all([
    ...authWatcherSaga,
    ...configWatcherSaga,
    ...localeWatcherSaga,
    ...organizationWatcherSaga,
    ...trainingWatcherSaga,
    ...trainingElementWatcherSaga,
    ...userWatcherSaga
  ])
}