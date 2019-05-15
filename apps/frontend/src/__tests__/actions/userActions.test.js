import * as actions from '../../actions/userActions';
import { isFSA } from 'flux-standard-action';

describe('User actions', () => {
  describe('Get current user', () => {
    it('fetchCurrentUser should return proper action', () => {
      const action = actions.fetchCurrentUser();
      expect(isFSA(action)).toBeTruthy()
      expect(action).toEqual({
        type: actions.fetchCurrentUser.toString(),
      })
    })

    it('fetchCurrentUserSuccess should return proper action', () => {
      const action = actions.fetchCurrentUserSuccess({ content: [] });
      expect(isFSA(action)).toBeTruthy()
      expect(action).toEqual({
        type: actions.fetchCurrentUserSuccess.toString(),
        payload: { content: [] }
      })
    })

    it('fetchCurrentUserError should return proper action', () => {
      const action = actions.fetchCurrentUserError(new Error('some error'));
      expect(isFSA(action)).toBeTruthy()
      expect(action).toEqual({
        type: actions.fetchCurrentUserError.toString(),
        error: true, // auk: where???
        payload: new Error('some error')
      })
    })
  })

  describe('Clear current user', () => {
    it('clearCurrentUser should return CLEAR_CURRENT_USER', () => {
      expect(actions.clearCurrentUser()).toEqual({
        type: actions.clearCurrentUser.toString(),
      })
    })
  })
})