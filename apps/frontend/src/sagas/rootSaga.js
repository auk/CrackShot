import { all } from "redux-saga/effects";
import { authWatcherSaga } from './authSaga';
import { configWatcherSaga } from './configSaga';
import { localeWatcherSaga } from './localeSaga';
import { organizationWatcherSaga } from './organizationSaga';

export default function* rootSaga() {
  yield all([
    ...authWatcherSaga,
    ...configWatcherSaga,
    ...localeWatcherSaga,
    ...organizationWatcherSaga
  ])
}