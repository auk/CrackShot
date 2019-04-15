import * as ACTIONS from 'constants/actions';

/**
 * Login
 */
export const login = (values, history) => ({ type: ACTIONS.LOGIN_REQUEST, values, history, });
export const loginSuccess = payload => ({ type: ACTIONS.LOGIN_SUCCESS, payload, });
export const loginFailure = error => ({ type: ACTIONS.LOGIN_FAILURE, error, });

/**
 * Logout
 */
export const logout = () => ({ type: ACTIONS.LOGOUT_REQUEST, });
export const logoutSuccess = () => ({ type: ACTIONS.LOGOUT_SUCCESS, });
export const logoutFailure = error => ({ type: ACTIONS.LOGOUT_FAILURE, error, });

/**
 * Set view by role
 */
export const checkPermission = (userRoles, availableRoles) => ({ type: ACTIONS.CHECK_PERMISSION, userRoles, availableRoles });
export const changeStatus = payload => ({ type: ACTIONS.CHANGE_STATUS, payload });