import { call, put, select } from "redux-saga/effects";
import { cloneableGenerator } from 'redux-saga/utils';
import * as sagas from '../../sagas/configSaga';
import * as actions from '../../actions/configActions';
import { callApi } from '../../utils/ApiUtils';

describe('Config saga', () => {
  const fakeResponse = {
    data: {
      services: {
        rest: 'a',
        auth: 'b',
      }
    }
  }

  const gen = cloneableGenerator(sagas.fetchConfig)();

  it('Should call API', () => {
    expect(gen.next().value).toEqual(call(callApi, {
      url: `${process.env.PUBLIC_URL}${process.env.PUBLIC_URL ? '/config.prod.json' : '/config.dev.json'}`,
    }));
  })

  describe('Should handle success response', () => {
    let clone;
    beforeAll(() => {
      clone = gen.clone();
    });

    it('Handle response', () => {
      expect(clone.next(fakeResponse).value).toEqual(put(actions.fetchConfigSuccess(fakeResponse.data)))
    })

    it('End', () => {
      expect(clone.next().done).toBe(true);
    })
  })

  describe('Should handle failure response', () => {
    let clone;
    beforeAll(() => {
      clone = gen.clone();
    });

    it('Handle response', () => {
      expect(clone.throw(new Error('some error')).value).toEqual(put(actions.fetchConfigFailure(new Error('some error'))))
    })

    it('End', () => {
      expect(clone.next().done).toBe(true);
    })
  })
})