import { handleActions } from 'redux-actions';

import * as actions from '../actions/modalActions';
import initialState from '../reducers/initialState';

/*export const reducer = (state = initialState.modal, action) => {
  switch (action.type) {
    case ACTIONS.SHOW_MODAL:
      return {
        ...state,
        ...action.modal,
      };
    case ACTIONS.HIDE_MODAL:
      return initialState.modal;
    default:
      return state;
  }
}*/

export const reducer = handleActions({
  [ actions.showModal.toString() ]: (state, action) => {
    // console.log("modalReducer.showModal, action:", JSON.stringify(action));
    return {
      ...state,
      ...action.payload
    };
  },
  [ actions.hideModal.toString() ]: (state, action) => {
    // console.log("modalReducer.hideModal");
    return initialState.modal;
  }
}, initialState.modal);
