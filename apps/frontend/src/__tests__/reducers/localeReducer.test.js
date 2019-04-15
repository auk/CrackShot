import { localeReducer } from '../../reducers/localeReducer';
import * as ACTIONS from '../../constants/actions';
import initialState from '../../reducers/initialState';

describe('Locale reducer', () => {
  it('should return the initial state', () => {
    expect(localeReducer(undefined, {})).toEqual(initialState.locale)
  })

  it('should handle LOCALE_SWITCHED', () => {
    expect(
      localeReducer({}, {
          type: ACTIONS.LOCALE_SWITCHED,
          locale: 'ru'
        })
    ).toEqual('ru')
  })
})