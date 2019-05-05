import { createActions } from 'redux-actions';

function createDummyActions(name) {
  return createActions({
    [ name ]: (requestParams) => ({ requestParams }),
    [ name + '_SUCCESS' ]: payload => ({...payload}),
    [ name + '_ERROR' ]: error => ({...error})
  });
}

export const { fetchOrganizations, fetchOrganizationsSuccess, fetchOrganizationsError } = createDummyActions('FETCH_ORGANIZATIONS');
export const { fetchOrganization, fetchOrganizationSuccess, fetchOrganizationError } = createDummyActions('FETCH_ORGANIZATION');
export const { createOrganization, createOrganizationSuccess, createOrganizationError } = createDummyActions('CREATE_ORGANIZATION');
export const { updateOrganization, updateOrganizationSuccess, updateOrganizationError } = createDummyActions('UPDATE_ORGANIZATION');
export const { deleteOrganization, deleteOrganizationSuccess, deleteOrganizationError } = createDummyActions('DELETE_ORGANIZATION');
export const { fetchOrganizationUsers, fetchOrganizationUsersSuccess, fetchOrganizationUsersError } = createDummyActions('FETCH_ORGANIZATION_USERS');
export const { createOrganizationUser, createOrganizationUserSuccess, createOrganizationUserError } = createActions('CREATE_ORGANIZATION_USER');
