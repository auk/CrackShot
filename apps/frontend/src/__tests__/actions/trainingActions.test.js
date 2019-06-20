import * as actions from '../../actions/trainingActions';
import { isFSA } from 'flux-standard-action';

describe('Training actions', () => {
  test('create training', () => {
    expect(actions.createTraining('some params')).toEqual({
      type: actions.createTraining.toString(),
      payload: 'some params'
    })
  })

  test('create training with params', () => {
    const params = { organization: 'org1', date: '1970-01-01', users: [ 'auk', 'kro' ]};

    const action = actions.createTraining(params)
    expect(isFSA(action)).toBeTruthy()
    expect(action).toEqual({
      type: actions.createTraining.toString(),
      payload: { ...params }
    })
  })
})