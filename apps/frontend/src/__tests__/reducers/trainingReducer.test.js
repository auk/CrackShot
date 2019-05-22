import * as actions from '../../actions/trainingActions'
import initialState from '../../reducers/initialState';

import { isFSA } from 'flux-standard-action';

import { trainingReducer, trainingsReducer } from '../../reducers/trainingReducers';

describe('Training reducer', () => {
  test('should return the initial state', () => {
    expect(trainingReducer(undefined, {})).toEqual(initialState.training)
    expect(trainingReducer(undefined, { id: 'fake' })).toEqual(initialState.training)
    expect(trainingReducer(undefined, initialState.training)).toEqual(initialState.training)
  })

  test('should handle create training', () => {
    const data = { organiation: 'Org 1', date: 'today', users: [ 'auk', 'kro'] };
    const action = actions.createTraining(data);
    expect(isFSA(action)).toBeTruthy()
    expect(trainingReducer({}, action)).toEqual({ error: null, isFetching: true });
  })

})