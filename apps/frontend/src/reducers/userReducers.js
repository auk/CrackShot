import { handleActions, combineActions } from 'redux-actions';
import { handleRequest, handleRequestSuccess, handlePageableRequestSuccess, handleRequestError } from './reducerFactories';
import * as actions from '../actions/userActions';
import initialState from '../reducers/initialState';

export const currentUserReducer = handleActions({
  [ combineActions(actions.fetchCurrentUser) ]: handleRequest,
  [ combineActions(actions.fetchCurrentUserSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.fetchCurrentUserError) ]: handleRequestError
}, initialState.currentUser);

export const userReducer = handleActions({
  [ combineActions(actions.deleteUser, actions.updateUser) ]: handleRequest,
  [ combineActions(actions.deleteUserSuccess, actions.updateUserSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.deleteUserError, actions.updateUserError) ]: handleRequestError
}, initialState.user);

export const usersReducer = handleActions({
  [ combineActions(actions.fetchUsers) ]: handleRequest,
  [ combineActions(actions.fetchUsersSuccess) ]: handlePageableRequestSuccess,
  [ combineActions(actions.fetchUsersError) ]: handleRequestError
}, initialState.users);