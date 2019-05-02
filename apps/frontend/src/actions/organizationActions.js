import { createActions } from 'redux-actions';

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

export const { createOrganization, createOrganizationSuccess, createOrganizationError } = createActions({
  CREATE_ORGANIZATION: (requestParams) => ({ requestParams }),
  CREATE_ORGANIZATION_SUCCESS: null,
  CREATE_ORGANIZATION_ERROR: null
});

export const { updateOrganization, updateOrganizationSuccess, updateOrganizationError } = createActions({
  UPDATE_ORGANIZATION: (requestParams) => ({ requestParams }),
  UPDATE_ORGANIZATION_SUCCESS: null,
  UPDATE_ORGANIZATION_ERROR: null
});

export const { deleteOrganization, deleteOrganizationSuccess, deleteOrganizationError } = createActions({
  DELETE_ORGANIZATION: (requestParams) => ({ requestParams }),
  DELETE_ORGANIZATION_SUCCESS: null,
  DELETE_ORGANIZATION_ERROR: null
});

export const { fetchOrganizationUsers, fetchOrganizationUsersSuccess, fetchOrganizationUsersError } = createActions({
  FETCH_ORGANIZATION_USERS: (oid, requestParams) => ({ oid, requestParams }),
  FETCH_ORGANIZATION_USERS_SUCCESS: null,
  FETCH_ORGANIZATION_USERS_ERROR: null
});

export const { createOrganizationUser, createOrganizationUserSuccess, createOrganizationUserError } = createActions({
  CREATE_ORGANIZATION_USER: (oid, uid) => ({ oid, uid }),
  CREATE_ORGANIZATION_USER_SUCCESS: null,
  CREATE_ORGANIZATION_USER_ERROR: null
});
