/**
 * Config action types
 */
export const FETCH_CONFIG_REQUEST = 'FETCH_CONFIG_REQUEST';
export const FETCH_CONFIG_SUCCESS = 'FETCH_CONFIG_SUCCESS';
export const FETCH_CONFIG_FAILURE = 'FETCH_CONFIG_FAILURE';

export const FETCH_VERSION_REQUEST = 'FETCH_VERSION_REQUEST';
export const FETCH_VERSION_SUCCESS = 'FETCH_VERSION_SUCCESS';
export const FETCH_VERSION_FAILURE = 'FETCH_VERSION_FAILURE';

/**
 * Switch locale
 */
export const LOCALE_SWITCHED = 'LOCALE_SWITCHED';


/**
 * Auth action types
 */
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

/**
 * Check is user admin
 */
export const CHECK_PERMISSION = 'CHECK_PERMISSION';
export const CHANGE_STATUS = 'CHANGE_STATUS';

/*function createTriple(name) {
  return [ name, name + '_SUCCESS', name + '_FAILURE'];
}

export const { FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } = createTriple('FETCH_USERS');
export const { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } = createTriple('FETCH_USER');
export const { CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILURE } = createTriple('CREATE_USER');
export const { UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } = createTriple('UPDATE_USER');
*/