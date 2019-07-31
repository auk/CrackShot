import { createActions } from 'redux-actions';

export function createSimpleActions(name) {
  return createActions({
    [ name ]: null,
    [ name + '_SUCCESS' ]: null,
    [ name + '_ERROR' ]: null
  });
}

export function createPageableActions(name) {
  return createActions({
    [ name ]: (requestParams) => ({ requestParams }),
    [ name + '_SUCCESS' ]: null,
    [ name + '_ERROR' ]: null
  });
}

export function createPageableActionsEx(name) {
  return createActions({
    [ name ]: (params, pageable) => ({ params, pageable }),
    [ name + '_SUCCESS' ]: null,
    [ name + '_ERROR' ]: null
  });
}