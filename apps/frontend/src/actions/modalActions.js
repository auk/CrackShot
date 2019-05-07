import { createAction } from 'redux-actions';

export const hideModal = createAction('HIDE_MODAL');
export const showModal = createAction('SHOW_MODAL', modal => modal);
