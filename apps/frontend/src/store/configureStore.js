import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";

import rootReducer from '../reducers/index';
import rootSaga from '../sagas/rootSaga';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = process.env.NODE_ENV === 'development' ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

console.log('Store mode:', process.env.NODE_ENV);

export default function configureStore() {
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(rootSaga);

  return store;
}