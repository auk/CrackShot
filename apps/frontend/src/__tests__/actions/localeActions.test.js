import * as TYPES from '../../constants/actions';
import * as actions from '../../actions/localeActions';

describe('Locale actions', () => {
  it('switchLocale should return LOCALE_SWITCHED', () => {
    expect(actions.switchLocale('locale')).toEqual({ 
      type: TYPES.LOCALE_SWITCHED, 
      locale: 'locale',
    })
  })
})