import { call, put, select } from "redux-saga/effects";
import { cloneableGenerator } from '@redux-saga/testing-utils';
import * as actions from '../../actions/organizationActions';
import * as sagas from '../../sagas/organizationSaga';
import * as selectors from '../../selectors';
import { callApi } from '../../utils/ApiUtils';

describe('Fetch organizations', () => {
  const fakeParams = {
    page: 0,
    size: 5,
    sortOrder: 'desc',
    sortField: 'name',
    filter: {}
  }
  const fakeQueryParams = { config: { params: fakeParams } };
  const fakeResponse = { data: { content: [ { id: 'org1', name: 'Org 1' }, { id: 'org2', name: 'Org 2' } ] } };

  const fakeError = new Error('some error');

  const gen = cloneableGenerator(sagas.fetchOrganizations)({ requestParams: fakeParams });

  it('should get resource URL', () => {
    expect(gen.next().value).toEqual(select(selectors.getOrganizationsUrl));
  })

  it ('should call API', () => {
    expect(gen.next('/orgs').value).toEqual(call(callApi, { url: '/orgs', ...fakeQueryParams }));
  })

  describe('Should handle success response', () => {
    let clone;
    beforeAll(() => {
      clone = gen.clone();
    });

    it('handle response', () => {
      expect(clone.next(fakeResponse).value).toEqual(put(actions.fetchOrganizationsSuccess({ ...fakeResponse.data, requestParams: fakeParams })))
    })

    it('end', () => {
      expect(clone.next().done).toBe(true);
    })
  })

  describe('Should handle failure response', () => {
    let clone;
    beforeAll(() => {
      clone = gen.clone();
    });

    it('handle response', () => {
      expect(clone.throw(fakeError).value).toEqual(put(actions.fetchOrganizationsError(fakeError)))
    })

    it('end', () => {
      expect(clone.next().done).toBe(true);
    })
  })

});