import { authReducer } from '../../reducers/authReducer';
import * as ACTIONS from '../../constants/actions';
import initialState from '../../reducers/initialState';

describe('Auth reducer', () => {
  const fakeError = new Error('err');
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState.auth)
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(authReducer(
      { loggingIn: false, },
      { type: ACTIONS.LOGIN_REQUEST, }
    )).toEqual({
      loggingIn: true,
    })
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(authReducer(
      { loggingIn: true, },
      {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: {
          exp: 'exp',
          user_name: 'user_name',
          authorities: 'authorities',
        }
      }
    )).toEqual({
      loggingIn: false,
      error: null,
      exp: 'exp',
      user_name: 'user_name',
      role: 'authorities',
    })
  })

  it('should handle LOGIN_FAILURE', () => {
    expect(authReducer(
      {
        loggingIn: true,
        error: null,
        user_name: '123123',
        role: ['capitan'],
        exp: 15461494984984,
      }, {
        type: ACTIONS.LOGIN_FAILURE,
        error: new Error('some error'),
      }
    )).toEqual({
      loggingIn: false,
      error: new Error('some error'),
      user_name: null,
      role: null,
      exp: null,
    })
  })

  it('should handle LOGOUT_REQUEST', () => {
    expect(authReducer({
      loggingOut: false,
    }, {
        type: ACTIONS.LOGOUT_REQUEST,
      }
    )).toEqual({
      loggingOut: true,
    })
  })

  it('should handle LOGOUT_SUCCESS', () => {
    expect(authReducer({
      loggingOut: true,
    }, {
        type: ACTIONS.LOGOUT_SUCCESS,
      }
    )).toEqual({
      loggingOut: false,
      user_name: null,
      role: null,
      exp: null,
    })
  })

  it('should handle LOGOUT_FAILURE', () => {
    expect(authReducer({
      loggingOut: true,
    }, {
        type: ACTIONS.LOGOUT_FAILURE,
        error: fakeError,
      }
    )).toEqual({
      loggingOut: false,
      error: fakeError,
    })
  })

  it('should handle CHANGE_STATUS', () => {
    expect(authReducer({}, {
        type: ACTIONS.CHANGE_STATUS,
        payload: 'a'
      }
    )).toEqual({
      isAdmin: 'a',
      permissionChecked: true,
    })
  })
})