import { handleActions, combineActions } from 'redux-actions';
import { handleRequest, handleRequestSuccess, handlePageableRequestSuccess, handleRequestError } from './reducerFactories';
import * as actions from '../actions/organizationActions';
import initialState from '../reducers/initialState';

export const organizationsReducer = handleActions({
  [ combineActions(actions.fetchOrganizations) ]: handleRequest,
  [ combineActions(actions.fetchOrganizationsSuccess) ]: handlePageableRequestSuccess,
  [ combineActions(actions.fetchOrganizationsError) ]: handleRequestError
}, initialState.organizations);

export const organizationReducer = handleActions({
  [ combineActions(actions.createOrganization) ]: handleRequest,
  [ combineActions(actions.createOrganizationSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.createOrganizationError) ]: handleRequestError
}, initialState.organization);