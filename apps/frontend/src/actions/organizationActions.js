import { createAction, createActions, createReducer } from 'redux-actions';

export const { fetchOrganizations, fetchOrganizationsSuccess, fetchOrganizationsError } = createActions({
  FETCH_ORGANIZATIONS: (requestParams) => ({ requestParams }),
  FETCH_ORGANIZATIONS_SUCCESS: null,
  FETCH_ORGANIZATIONS_ERROR: null
});

export const { fetchOrganization, fetchOrganizationSuccess, fetchOrganizationError } = createActions({
  FETCH_ORGANIZATION: (oid) => ({ oid }),
  FETCH_ORGANIZATION_SUCCESS: null,
  FETCH_ORGANIZATION_ERROR: null
});