import { reducer as modalReducer } from '../../reducers/modalReducer';
import * as actions from '../../actions/modalActions';
import initialState from '../../reducers/initialState';

describe('Modal reducer', () => {
  it('should return the initial state', () => {
    expect(modalReducer(undefined, {})).toEqual(initialState.modal)
  })

  it('should handle SHOW_MODAL', () => {
    expect(modalReducer({}, {
      type: actions.showModal.toString(),
    })
    ).toEqual({})
  })

  it('should handle HIDE_MODAL', () => {
    expect(modalReducer({}, { 
      type: actions.hideModal.toString(),
    })
    ).toEqual(initialState.modal)
  })
})