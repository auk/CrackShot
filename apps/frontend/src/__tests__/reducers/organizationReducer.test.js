import { isFSA } from 'flux-standard-action';

import { reducer as organizationReducer } from '../../reducers/organizationReducer';
import { rootReducer } from '../../reducers/index';
import * as actions from '../../actions/organizationActions'
import initialState from '../../reducers/initialState';

describe('Organization reducer', () => {
  test('should return the initial state', () => {
    expect(organizationReducer(undefined, {})).toEqual(initialState)
    expect(organizationReducer(undefined, { id: 'fake' })).toEqual(initialState)
    expect(organizationReducer(undefined, initialState)).toEqual(initialState)
  })

  test('should handle FETCH_ORGANIZATIONS', () => {
    const action = actions.fetchOrganizations();
    expect(isFSA(action)).toBeTruthy()

    expect(organizationReducer({}, action)).toEqual({ content: null, error: null, isFetching: true });
  })

  test('should handle FETCH_ORGANIZATIONS_SUCCESS', () => {
    const payload = [
      { id: 1, name: 'Org 1' },
      { id: 2, name: 'Org 2' }
    ]
    const action = actions.fetchOrganizationsSuccess(payload);
    expect(isFSA(action)).toBeTruthy()

    expect(organizationReducer({}, action)).toEqual({ content: payload, error: null, isFetching: false });
  })

  test('should handle FETCH_ORGANIZATIONS_ERROR', () => {
    const payload = { id: 1, error: 'Text error' };
    const action = actions.fetchOrganizationsError(payload);
    expect(isFSA(action)).toBeTruthy()

    expect(organizationReducer({}, action)).toEqual({ content: null, error: payload, isFetching: false });
  })

  test('should handle FETCH_ORGANIZATION', () => {
    const action = actions.fetchOrganization({ id: '001' });
    expect(isFSA(action)).toBeTruthy()
    expect(organizationReducer({}, action)).toEqual({ content: null, error: null, isFetching: true });
  })

  test('should handle FETCH_ORGANIZATION_SUCCESS', () => {
    const payload = { id: '001', name: 'Org 1' }
    const action = actions.fetchOrganizationSuccess(payload);
    expect(isFSA(action)).toBeTruthy()

    expect(organizationReducer({}, action)).toEqual({ content: payload, error: null, isFetching: false });
  })
})