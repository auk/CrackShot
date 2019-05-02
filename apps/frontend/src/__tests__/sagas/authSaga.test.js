import { call, put, select } from "redux-saga/effects";
import { cloneableGenerator } from '@redux-saga/testing-utils';
import * as sagas from '../../sagas/authSaga';
import * as actions from '../../actions/authActions';
import * as selectors from '../../selectors';
import { authApi } from '../../utils/ApiUtils';

describe('Auth saga', () => {
  describe('Login', () => {
    const gen = cloneableGenerator(sagas.login)({ a: 1, b: 2 });

    it('Should return URL', () => {
      expect(gen.next().value).toEqual(select(selectors.getAuthUrl));
    })

    it('Should call API', () => {
      expect(gen.next('some url').value).toEqual(call(authApi, {
        url: 'some url',
        config: {
          method: 'POST',
          params: {
            grant_type: "password",
          }
        }
      }));
    })

    /*describe('Should handle success response', () => {
      let clone;
      beforeAll(() => {
        clone = gen.clone();
      });

      it('Handle response', () => {
        expect(clone.next({
          data: {
            access_token: 'some token',
          }
        }).value).toEqual(put(actions.loginSuccess(null)))
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
        expect(clone.throw(new Error('some error')).value).toEqual(put(actions.loginFailure(new Error('some error'))))
      })

      it('End', () => {
        expect(clone.next().done).toBe(true);
      })
    })*/
  })


  /*describe('Logout', () => {
    const gen = cloneableGenerator(sagas.logout)();

    describe('Should handle success response', () => {
      let clone;
      beforeAll(() => {
        clone = gen.clone();
      });

      it('Handle response', () => {
        expect(clone.next().value).toEqual(put(actions.logoutSuccess()));
      })

      it('End', () => {
        expect(clone.next().done).toBe(true);
      })
    })

    //TODO: Some strange error with throwing error
    // describe('Should handle failure response', () => {
    //   let clone;
    //   beforeAll(() => {
    //     clone = gen.clone();
    //   });

    //   it('Handle response', () => {
    //     expect(clone.throw(new Error('some error')).value).toEqual(put(actions.logoutFailure(new Error('some error'))))
    //   })

    //   it('End', () => {
    //     expect(clone.next().done).toBe(true);
    //   })
    // })
  })*/
})