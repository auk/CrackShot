import { isFSA } from 'flux-standard-action';

import { organizationReducer, organizationsReducer } from '../../reducers/organizationReducer';
import { rootReducer } from '../../reducers/index';
import * as actions from '../../actions/organizationActions'
import initialState from '../../reducers/initialState';

describe('Organization reducer', () => {
  test('should return the initial state', () => {
    expect(organizationsReducer(undefined, {})).toEqual(initialState.organizations)
    expect(organizationsReducer(undefined, { id: 'fake' })).toEqual(initialState.organizations)
    expect(organizationsReducer(undefined, initialState.organizations)).toEqual(initialState.organizations)
  })

  test('should handle FETCH_ORGANIZATION', () => {
    const action = actions.fetchOrganization({ id: '001' });
    expect(isFSA(action)).toBeTruthy()
    expect(organizationReducer({}, action)).toEqual({ error: null, isFetching: true });
  })

  test('should handle FETCH_ORGANIZATION_SUCCESS', () => {
    const payload = { id: '001', name: 'Org 1' }
    const action = actions.fetchOrganizationSuccess(payload);
    expect(isFSA(action)).toBeTruthy()

    expect(organizationReducer({}, action)).toEqual({ content: payload, error: null, isFetching: false });
  })
})

describe('Organizations reducer', () => {
  test('should return the initial state', () => {
    expect(organizationReducer(undefined, {})).toEqual(initialState.organization)
    expect(organizationReducer(undefined, { id: 'fake' })).toEqual(initialState.organization)
    expect(organizationReducer(undefined, initialState.organization)).toEqual(initialState.organization)
  })

  test('should handle FETCH_ORGANIZATIONS', () => {
    const action = actions.fetchOrganizations();
    expect(isFSA(action)).toBeTruthy()
    expect(organizationsReducer({}, action)).toEqual({ error: null, isFetching: true });
  })

  test('should handle FETCH_ORGANIZATIONS with params', () => {
    const action = actions.fetchOrganizations({ page: 1, sort: 'name'});
    expect(isFSA(action)).toBeTruthy()
    expect(organizationsReducer({}, action)).toEqual({ error: null, isFetching: true });
  })

  test('should handle FETCH_ORGANIZATIONS_SUCCESS', () => {
    const payload = [
      { id: 1, name: 'Org 1' },
      { id: 2, name: 'Org 2' }
    ]
    const action = actions.fetchOrganizationsSuccess({ content: payload });
    expect(isFSA(action)).toBeTruthy()
    expect(organizationsReducer({}, action)).toEqual({ content: payload, error: null, isFetching: false });
  })

  test('should handle FETCH_ORGANIZATIONS_SUCCESS ex', () => {
    const payload = [
      { id: 1, name: 'Org 1' },
      { id: 2, name: 'Org 2' }
    ]
    const action = actions.fetchOrganizationsSuccess({ content: payload });
    expect(isFSA(action)).toBeTruthy()
    expect(organizationsReducer({}, action)).toEqual({ content: payload, error: null, isFetching: false });
  })

  test('should handle FETCH_ORGANIZATIONS_ERROR', () => {
    const payload = { id: 1, error: 'Text error' };
    const action = actions.fetchOrganizationsError(payload);
    expect(isFSA(action)).toBeTruthy()

    expect(organizationsReducer({}, action)).toEqual({ content: [], error: payload, isFetching: false });
  })

})
