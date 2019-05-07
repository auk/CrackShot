import { createAction } from 'redux-actions';

export const hideModal = createAction('HIDE_MODAL');
console.assert(hideModal);
export const showModal = createAction('SHOW_MODAL', modal => modal);
console.assert(showModal);
