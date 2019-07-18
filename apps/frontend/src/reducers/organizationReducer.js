import { handleActions, combineActions } from 'redux-actions';
import { handleRequest, handleRequestSuccess, handlePageableRequestSuccess, handleRequestError, handleRequestPageableError } from './reducerFactories';
import * as actions from '../actions/organizationActions';
import initialState from '../reducers/initialState';

export const organizationsReducer = handleActions({
  [ combineActions(actions.fetchOrganizations) ]: handleRequest,
  [ combineActions(actions.fetchOrganizationsSuccess) ]: handlePageableRequestSuccess,
  [ combineActions(actions.fetchOrganizationsError) ]: handleRequestPageableError
}, initialState.organizations);

export const organizationReducer = handleActions({
  [ combineActions(actions.createOrganization, actions.fetchOrganization, actions.updateOrganization) ]: handleRequest,
  [ combineActions(actions.createOrganizationSuccess, actions.fetchOrganizationSuccess, actions.updateOrganizationSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.createOrganizationError, actions.fetchOrganizationError, actions.updateOrganizationError) ]: handleRequestError
}, initialState.organization);