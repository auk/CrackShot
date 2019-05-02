import { configReducer } from '../../reducers/configReducer';
import * as ACTIONS from '../../constants/actions';
import initialState from '../../reducers/initialState';

describe('Config reducer', () => {
  const fakeError = new Error('Some error');

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
          error: fakeError,
        })
    ).toEqual({
      error: fakeError,
      isFetching: false,
      isConfigLoaded: false,
    })
  })

  it('should handle FETCH_VERSION_SUCCESS', () => {
    expect(
      configReducer({
        error: null,
        webapp: {
          version: {}
        }
      }, {
          type: ACTIONS.FETCH_VERSION_SUCCESS,
          payload: {
            version: '1.0.0',
          }
        })
    ).toEqual({
      error: null,
      webapp: {
        isFetching: false,
        version: "1.0.0",
      }
    })
  })

  test('should handle FETCH_VERSION_FAILURE', () => {
    const initialState = {
      webapp: {
        version: null
      }
    };
    const action = {
      type: ACTIONS.FETCH_VERSION_FAILURE,
      error: new Error('Some error')
    };
    expect(configReducer(initialState, action)).toEqual({
      webapp: {
        error: new Error('Some error'),
        isFetching: false,
      }
    })
  })
})