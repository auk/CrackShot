import { createSimpleActions, createPageableActions } from './actionFactories';

export const { fetchOrganizations, fetchOrganizationsSuccess, fetchOrganizationsError } = createPageableActions('FETCH_ORGANIZATIONS');
export const { fetchOrganization, fetchOrganizationSuccess, fetchOrganizationError } = createSimpleActions('FETCH_ORGANIZATION');
export const { createOrganization, createOrganizationSuccess, createOrganizationError } = createSimpleActions('CREATE_ORGANIZATION');
export const { updateOrganization, updateOrganizationSuccess, updateOrganizationError } = createSimpleActions('UPDATE_ORGANIZATION');