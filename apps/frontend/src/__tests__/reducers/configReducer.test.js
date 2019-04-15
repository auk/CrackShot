import { configReducer } from '../../reducers/configReducer';
import * as ACTIONS from '../../constants/actions';
import initialState from '../../reducers/initialState';

describe('Config reducer', () => {
  it('should return the initial state', () => {
    expect(configReducer(undefined, {})).toEqual(initialState.config)
  })

  it('should handle FETCH_CONFIG_REQUEST', () => {
    expect(
      configReducer({
        isFetching: false,  
      }, {
        type: ACTIONS.FETCH_CONFIG_REQUEST,
      })
    ).toEqual({
      isFetching: true,
      isConfigLoaded: false,
    })
  })

  it('should handle FETCH_CONFIG_SUCCESS', () => {
    expect(
      configReducer({
        isFetching: true,
        isConfigLoaded: false,
      }, {
          type: ACTIONS.FETCH_CONFIG_SUCCESS,
        })
    ).toEqual({
      error: null,
      isFetching: false,
      isConfigLoaded: true,
    })
  })

  it('should handle FETCH_CONFIG_FAILURE', () => {
    expect(
      configReducer({
        error: null,
        isFetching: true,
        isConfigLoaded: false,
      }, {
          type: ACTIONS.FETCH_CONFIG_FAILURE,
          error: new Error('Some error'),
        })
    ).toEqual({
      error: new Error('Some error'),
      isFetching: false,
      isConfigLoaded: false,
    })
  })
})