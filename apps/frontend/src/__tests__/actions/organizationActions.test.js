import * as actions from '../../actions/organizationActions';
import { isFSA } from 'flux-standard-action';
// import { createAction, createActions } from 'redux-actions';

describe('Organizations actions', () => {
  describe('Get organizations', () => {
    test('fetch organizations', () => {
      expect(actions.fetchOrganizations('some params')).toEqual({
        type: 'FETCH_ORGANIZATIONS',
        payload: {
          requestParams: 'some params',
        }
      })
    })

    test('fetch organizations success', () => {
      const action = actions.fetchOrganizationsSuccess( [ { id: '001', name: 'org'} ] );
      expect(isFSA(action)).toBeTruthy()
      expect(actions.fetchOrganizationsSuccess.toString()).toEqual('FETCH_ORGANIZATIONS_SUCCESS');
      expect(action).toEqual({
        type: 'FETCH_ORGANIZATIONS_SUCCESS',
        payload: [
          {
            id: '001',
            name: 'org'
          }
        ]
      })
    })

    test('fetch organizations error', () => {
      const action = actions.fetchOrganizationsError( [ { id: '001', error: 'text'} ]);
      expect(isFSA(action)).toBeTruthy()
      expect(action).toEqual({
        type: 'FETCH_ORGANIZATIONS_ERROR',
        payload: [
          {
            id: '001',
            error: 'text'
          }
        ]
      })
    })

    test('fetch organization', () => {
      expect(actions.fetchOrganization('id-555')).toEqual({
        type: 'FETCH_ORGANIZATION',
        payload: {
          oid: 'id-555'
        }
      })
    })

    test('fetch organization success', () => {
      const action = actions.fetchOrganizationSuccess({ id: '001', name: 'org'});
      expect(isFSA(action)).toBeTruthy()
      expect(action).toEqual({
        type: 'FETCH_ORGANIZATION_SUCCESS',
        payload: {
          id: '001',
          name: 'org'
        }
      })
    })

    test('fetch organization error', () => {
      const action = actions.fetchOrganizationSuccess({ id: '001', error: 'text'});
      expect(isFSA(action)).toBeTruthy()
      expect(action).toEqual({
        type: 'FETCH_ORGANIZATION_SUCCESS',
        payload: {
          id: '001',
          error: 'text'
        }
      })
    })
  })
})

describe('Organizations actions', () => {
})