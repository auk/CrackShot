import { call, put, select } from "redux-saga/effects";
import { cloneableGenerator } from '@redux-saga/testing-utils';
import * as actions from '../../actions/trainingActions';
import * as sagas from '../../sagas/trainingSaga';
import * as selectors from '../../selectors';
import { callApi } from '../../utils/ApiUtils';

describe('Create training', () => {

  const data = {
    organization: 'org1',
    date: 'today',
    users: [ 'auk', 'kro' ]
  }

  const gen = cloneableGenerator(sagas.createTraining)({ requestParams: data });

  it('should get resource URL', () => {
    expect(gen.next().value).toEqual(select(selectors.createTrainingUrl));
  })

})