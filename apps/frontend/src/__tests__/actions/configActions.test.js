import * as TYPES from '../../constants/actions';
import * as actions from '../../actions/configActions';

describe('Config actions', () => {
  it('fetchConfig should return FETCH_CONFIG_REQUEST', () => {
    expect(actions.fetchConfig()).toEqual({
      type: TYPES.FETCH_CONFIG_REQUEST,
    })
  })

  it('fetchConfigSuccess should return FETCH_CONFIG_SUCCESS', () => {
    expect(actions.fetchConfigSuccess({ config: 'some config' })).toEqual({
      type: TYPES.FETCH_CONFIG_SUCCESS,
      payload: {
        config: 'some config',
      }
    })
  })

  it('fetchConfigFailure should return FETCH_CONFIG_FAILURE', () => {
    expect(actions.fetchConfigFailure(new Error('some error'))).toEqual({
      type: TYPES.FETCH_CONFIG_FAILURE,
      error: new Error('some error'),
    })
  })
})