import * as ACTIONS from 'constants/actions';
import initialState from './initialState';
import { authorityToRole } from 'selectors';

export function authReducer(state = initialState.auth, action = {}) {
  switch (action.type) {
    case ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        error: null,
        exp: action.payload.exp,
        user_name: action.payload.user_name,
        roles: action.payload.authorities ?
          Array.isArray(action.payload.authorities) ? action.payload.authorities.map(authorityToRole) : [ authorityToRole(action.payload.authorities) ]
          : [],
      };
    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        user_name: null,
        roles: null,
        exp: null,
        error: action.error,
      };
    case ACTIONS.LOGOUT_REQUEST:
      return {
        ...state,
        loggingOut: true
      };
    case ACTIONS.LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user_name: null,
        roles: null,
        exp: null
      };
    case ACTIONS.LOGOUT_FAILURE:
      return {
        ...state,
        loggingOut: false,
        error: action.error,
      };
    case ACTIONS.CHANGE_STATUS:
      return {
        ...state,
        isAdmin: action.payload,
        permissionChecked: true,
      }
    default:
      return state;
  }
}
