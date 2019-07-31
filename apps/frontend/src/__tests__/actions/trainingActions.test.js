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

describe('Training stages actions', () => {
  test('fetch training stages - empty body', () => {
    expect(actions.fetchTrainingStages()).toEqual({
      type: actions.fetchTrainingStages.toString(),
      payload: {}
    })
  })

  test('fetch training stages - only params - 1', () => {
    expect(actions.fetchTrainingStages("id")).toEqual({
      type: actions.fetchTrainingStages.toString(),
      payload: {
        params: "id",
        pageable: undefined
      }
    })
  })

  test('fetch training stages - only params - 2', () => {
    expect(actions.fetchTrainingStages({a: 1, b: 2})).toEqual({
      type: actions.fetchTrainingStages.toString(),
      payload: {
        params: { a: 1, b: 2 },
        pageable: undefined
      }
    })
  })

  test('fetch training stages - only pageable', () => {
    expect(actions.fetchTrainingStages(undefined, {a: 1, b: 2})).toEqual({
      type: actions.fetchTrainingStages.toString(),
      payload: {
        params: undefined,
        pageable: { a: 1, b: 2 }
      }
    })
  })

  test('fetch training stages - params and pageable', () => {
    expect(actions.fetchTrainingStages({ a: 1, b: 2 }, { page: 1 })).toEqual({
      type: actions.fetchTrainingStages.toString(),
      payload: {
        params: { a: 1, b: 2 },
        pageable: { page: 1 },
      }
    })
  })
})