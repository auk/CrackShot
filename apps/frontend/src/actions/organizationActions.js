import { createActions } from 'redux-actions';

function createSimpleActions(name) {
  return createActions({
    [ name ]: null,
    [ name + '_SUCCESS' ]: null,
    [ name + '_ERROR' ]: null
  });
}

function createRequestParamsActions(name) {
  return createActions({
    [ name ]: (requestParams) => ({ requestParams }),
    [ name + '_SUCCESS' ]: null,
    [ name + '_ERROR' ]: null
  });
}

export const { fetchOrganizations, fetchOrganizationsSuccess, fetchOrganizationsError } = createRequestParamsActions('FETCH_ORGANIZATIONS');
export const { fetchOrganization, fetchOrganizationSuccess, fetchOrganizationError } = createSimpleActions('FETCH_ORGANIZATION');
export const { createOrganization, createOrganizationSuccess, createOrganizationError } = createSimpleActions('CREATE_ORGANIZATION');
export const { updateOrganization, updateOrganizationSuccess, updateOrganizationError } = createRequestParamsActions('UPDATE_ORGANIZATION');
export const { deleteOrganization, deleteOrganizationSuccess, deleteOrganizationError } = createRequestParamsActions('DELETE_ORGANIZATION');
export const { fetchOrganizationUsers, fetchOrganizationUsersSuccess, fetchOrganizationUsersError } = createRequestParamsActions('FETCH_ORGANIZATION_USERS');
export const { createOrganizationUser, createOrganizationUserSuccess, createOrganizationUserError } = createActions('CREATE_ORGANIZATION_USER');
