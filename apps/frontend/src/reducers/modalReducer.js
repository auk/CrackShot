import { handleActions } from 'redux-actions';

import * as actions from '../actions/modalActions';
import initialState from '../reducers/initialState';

export const reducer = handleActions({
  [ actions.showModal.toString() ]: (state, action) => {
    return {
      ...state,
      ...action.payload
    };
  },
  [ actions.hideModal.toString() ]: (state, action) => {
    return initialState.modal;
  }
}, initialState.modal);
