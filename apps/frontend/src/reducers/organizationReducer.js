import { handleActions, combineActions } from 'redux-actions';

import * as actions from '../actions/organizationActions';
import initialState from '../reducers/initialState';

export const reducer = handleActions({
  [ combineActions(actions.fetchOrganizations, actions.fetchOrganization) ]: state => ({ ...state, isFetching: true, content: null, error: null }),
  [ combineActions(actions.fetchOrganizationsSuccess, actions.fetchOrganizationSuccess) ]: (state, action) => ({ ...state, isFetching: false, content: action.payload, error: null }),
  [ combineActions(actions.fetchOrganizationsError, actions.fetchOrganizationError) ]: (state, action) => ({ ...state, isFetching: false, content: null, error: action.payload })
}, initialState);
