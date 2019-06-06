import { createSimpleActions, createRequestParamsActions } from './actionFactories';

export const { deleteUser, deleteUserSuccess, deleteUserError } = createSimpleActions('DELETE_USER');
export const { fetchUsers, fetchUsersSuccess, fetchUsersError } = createRequestParamsActions('FETCH_USERS');
export const { fetchCurrentUser, fetchCurrentUserSuccess, fetchCurrentUserError } = createSimpleActions('FETCH_CURRENT_USER');
export const { clearCurrentUser } = createSimpleActions('CLEAR_CURRENT_USER');