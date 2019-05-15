import { createActions } from 'redux-actions';

export function createSimpleActions(name) {
  return createActions({
    [ name ]: null,
    [ name + '_SUCCESS' ]: null,
    [ name + '_ERROR' ]: null
  });
}

export function createRequestParamsActions(name) {
  return createActions({
    [ name ]: (requestParams) => ({ requestParams }),
    [ name + '_SUCCESS' ]: null,
    [ name + '_ERROR' ]: null
  });
}