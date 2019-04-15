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
    default:
      return state;
  }
}