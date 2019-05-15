import { createSimpleActions, createRequestParamsActions } from './actionFactories';

export const { fetchUsers, fetchUsersSuccess, fetchUsersError } = createRequestParamsActions('FETCH_USERS');
