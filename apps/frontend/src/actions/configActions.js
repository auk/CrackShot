import * as ACTIONS from 'constants/actions';

export const fetchConfig = () => ({ type: ACTIONS.FETCH_CONFIG_REQUEST, });
export const fetchConfigSuccess = payload => ({ type: ACTIONS.FETCH_CONFIG_SUCCESS, payload, });
export const fetchConfigFailure = error => ({ type: ACTIONS.FETCH_CONFIG_FAILURE, error, });