import { createSimpleActions, createPageableActions } from './actionFactories';

export const { fetchCurrentUser, fetchCurrentUserSuccess, fetchCurrentUserError } = createSimpleActions('FETCH_CURRENT_USER');
export const { fetchCurrentUserTrainings, fetchCurrentUserTrainingsSuccess, fetchCurrentUserTrainingsError } = createSimpleActions('FETCH_CURRENT_USER_TRAININGS');
export const { clearCurrentUser } = createSimpleActions('CLEAR_CURRENT_USER');

export const { fetchUser, fetchUserSuccess, fetchUserError } = createSimpleActions('FETCH_USER');
export const { deleteUser, deleteUserSuccess, deleteUserError } = createSimpleActions('DELETE_USER');
export const { updateUser, updateUserSuccess, updateUserError } = createSimpleActions('UPDATE_USER');
export const { fetchUserTrainings, fetchUserTrainingsSuccess, fetchUserTrainingsError } = createPageableActions('FETCH_USER_TRAININGS');

export const { fetchUsers, fetchUsersSuccess, fetchUsersError } = createPageableActions('FETCH_USERS');
