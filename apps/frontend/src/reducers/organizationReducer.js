import { handleActions, combineActions } from 'redux-actions';

import * as actions from '../actions/organizationActions';
import initialState from '../reducers/initialState';

const handleRequest = state => ({
  ...state,
  isFetching: true,
  error: null
});
const handleRequestSuccess = (state, action) => ({
  ...state,
  isFetching: false,
  content: action.payload,
  error: null
});
const handlePageableRequestSuccess = (state, action) => ({ 
  ...state,
  isFetching: false,
  totalPages: action.payload.totalPages,
  content: action.payload.content,
  error: null
});
const handleRequestError = (state, error) => ({
  ...state,
  isFetching: false,
  error: error.payload
});

export const organizationsReducer = handleActions({
  [ combineActions(actions.fetchOrganizations) ]: handleRequest,
  [ combineActions(actions.fetchOrganizationsSuccess) ]: handlePageableRequestSuccess,
  [ combineActions(actions.fetchOrganizationsError) ]: handleRequestError
}, initialState.organizations);

export const organizationReducer = handleActions({
  [ combineActions(actions.createOrganization, actions.fetchOrganization) ]: handleRequest,
  [ combineActions(actions.createOrganizationSuccess, actions.fetchOrganizationSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.createOrganizationError, actions.fetchOrganizationError) ]: handleRequestError
}, initialState.organization);