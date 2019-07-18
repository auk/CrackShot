import { handleActions, combineActions } from 'redux-actions';
import { handleRequest, handleRequestSuccess, handlePageableRequestSuccess, handleRequestError, handleRequestPageableError } from './reducerFactories';
import * as actions from '../actions/userActions';
import initialState from '../reducers/initialState';

export const currentUserReducer = handleActions({
  [ combineActions(actions.fetchCurrentUser, actions.fetchCurrentUserTrainings) ]: handleRequest,
  [ combineActions(actions.fetchCurrentUserSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.fetchCurrentUserTrainingsSuccess) ]: handlePageableRequestSuccess,
  [ combineActions(actions.fetchCurrentUserError, actions.fetchCurrentUserTrainingsError) ]: handleRequestError
}, initialState.currentUser);

export const userReducer = handleActions({
  [ combineActions(actions.fetchUser, actions.deleteUser, actions.updateUser) ]: handleRequest,
  [ combineActions(actions.fetchUserSuccess, actions.deleteUserSuccess, actions.updateUserSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.fetchUserError, actions.deleteUserError, actions.updateUserError) ]: handleRequestError
}, initialState.user);

export const userTrainingsReducer = handleActions({
  [ combineActions(actions.fetchUserTrainings) ]: handleRequest,
  [ combineActions(actions.fetchUserTrainingsSuccess) ]: handlePageableRequestSuccess,
  [ combineActions(actions.fetchUserTrainingsError) ]: handleRequestPageableError
}, initialState.user.trainings);

export const usersReducer = handleActions({
  [ combineActions(actions.fetchUsers) ]: handleRequest,
  [ combineActions(actions.fetchUsersSuccess) ]: handlePageableRequestSuccess,
  [ combineActions(actions.fetchUsersError) ]: handleRequestPageableError
}, initialState.users);