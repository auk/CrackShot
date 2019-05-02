import * as ACTIONS from 'constants/actions';
import initialState from './initialState';

export function configReducer(state = initialState.config, action) {
  switch (action.type) {
    case ACTIONS.FETCH_CONFIG_REQUEST:
      return {
        ...state,
        isFetching: true,
        isConfigLoaded: false,
      };
    case ACTIONS.FETCH_CONFIG_SUCCESS: 
      return {
        ...state,
        isFetching: false,
        isConfigLoaded: true,
        error: null,
        ...action.payload,
      };
    case ACTIONS.FETCH_CONFIG_FAILURE:
      return {
        ...state,
        isFetching: false,
        isConfigLoaded: false,
        error: action.error,
      };
      case ACTIONS.FETCH_VERSION_REQUEST:
      return {
        ...state,
        webapp: {
          isFetching: true,
          error: null,
          // version: state.webapp.version,
        }
      }
    case ACTIONS.FETCH_VERSION_SUCCESS:
      return {
        ...state,
        webapp: {
          isFetching: false,
          version: action.payload.version,
        }
      }
    case ACTIONS.FETCH_VERSION_FAILURE:
      return {
        ...state,
        webapp: {
          isFetching: false,
          error: action.error, 
        }
      }
    default:
      return state;
  }
}