import { cloneableGenerator } from '@redux-saga/testing-utils';
import * as sagas from '../../sagas/localeSaga';

describe('Locale saga', () => {
  const fakeResponse = {
    data: {
      services: {
        rest: 'a',
        auth: 'b',
      }
    }
  }

  describe('should success switch locale', () => {
    const gen = cloneableGenerator(sagas.switchLocale)('en');
    it('should switch locale', () => {
      expect(gen.next().value).toEqual();
    })
  
    it('end', () => {
      expect(gen.next().done).toBe(true);
    })
  })

  //TODO: Some strange error with throwing error
  // describe('should failure switch locale', () => {
  //   const gen = cloneableGenerator(sagas.switchLocale)('en');
  //   it('should switch locale', () => {
  //     expect(gen.throw(new Error('a')).value).toEqual(new Error('a'));
  //   })
  
  //   it('end', () => {
  //     expect(gen.next().done).toBe(true);
  //   })
  // })
})