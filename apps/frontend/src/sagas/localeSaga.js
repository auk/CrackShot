import { takeLatest } from "redux-saga/effects";

import * as TYPES from 'constants/actions';
import { LOCALE } from 'constants/utils';

export const localeWatcherSaga = [
  takeLatest(TYPES.LOCALE_SWITCHED, switchLocale),
];

export function* switchLocale({ locale }) {
  try {
    yield localStorage.setItem(LOCALE, locale);
  } catch (error) {
    console.error('Cannot switch locale:', error)
  }
}