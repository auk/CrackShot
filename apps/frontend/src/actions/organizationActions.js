import { createSimpleActions, createRequestParamsActions } from './actionFactories';

export const { fetchOrganizations, fetchOrganizationsSuccess, fetchOrganizationsError } = createRequestParamsActions('FETCH_ORGANIZATIONS');
export const { fetchOrganization, fetchOrganizationSuccess, fetchOrganizationError } = createSimpleActions('FETCH_ORGANIZATION');
export const { createOrganization, createOrganizationSuccess, createOrganizationError } = createSimpleActions('CREATE_ORGANIZATION');
// export const { updateOrganization, updateOrganizationSuccess, updateOrganizationError } = createRequestParamsActions('UPDATE_ORGANIZATION');
// export const { deleteOrganization, deleteOrganizationSuccess, deleteOrganizationError } = createRequestParamsActions('DELETE_ORGANIZATION');
// export const { fetchOrganizationUsers, fetchOrganizationUsersSuccess, fetchOrganizationUsersError } = createRequestParamsActions('FETCH_ORGANIZATION_USERS');
// export const { createOrganizationUser, createOrganizationUserSuccess, createOrganizationUserError } = createSimpleActions('CREATE_ORGANIZATION_USER');
