import * as ACTIONS from 'constants/actions';
import initialState from './initialState';

export function localeReducer(state = initialState.locale, action) {
  switch (action.type) {
    case ACTIONS.LOCALE_SWITCHED:
      return action.locale;
    default:
      return state;
  }
}