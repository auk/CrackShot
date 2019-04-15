import * as TYPES from '../../constants/actions';
import * as actions from '../../actions/authActions';

describe('Auth actions', () => {
  describe('Login', () => {
    it('login should return LOGIN_REQUEST', () => {
      expect(actions.login()).toEqual({
        type: TYPES.LOGIN_REQUEST,
      })
    })

    it('loginSuccess should return LOGIN_SUCCESS', () => {
      expect(actions.loginSuccess({
        user_name: 'un',
        exp: 'e',
      })).toEqual({
        type: TYPES.LOGIN_SUCCESS,
        payload: {
          user_name: 'un',
          exp: 'e',
        }
      })
    })

    it('loginFailure should return LOGIN_FAILURE', () => {
      expect(actions.loginFailure(new Error('some error'))).toEqual({
        type: TYPES.LOGIN_FAILURE,
        error: new Error('some error'),
      })
    })
  })

  describe('Logout', () => {
    it('logout should return LOGOUT_REQUEST', () => {
      expect(actions.logout()).toEqual({
        type: TYPES.LOGOUT_REQUEST,
      })
    })

    it('logoutSuccess should return LOGOUT_SUCCESS', () => {
      expect(actions.logoutSuccess()).toEqual({
        type: TYPES.LOGOUT_SUCCESS,
      })
    })

    it('logoutFailure should return LOGOUT_FAILURE', () => {
      expect(actions.logoutFailure(new Error('some error'))).toEqual({
        type: TYPES.LOGOUT_FAILURE,
        error: new Error('some error'),
      })
    })
  })
})