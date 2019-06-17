import { handleActions, combineActions } from 'redux-actions';
import { handleRequest, handleRequestSuccess, handlePageableRequestSuccess, handleRequestError } from './reducerFactories';
import * as actions from '../actions/trainingActions';
import initialState from './initialState';

export const trainingReducer = handleActions({
  [ combineActions(actions.createTraining, actions.fetchTraining) ]: handleRequest,
  [ combineActions(actions.createTrainingSuccess, actions.fetchTrainingSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.createTrainingError, actions.fetchTrainingError) ]: handleRequestError
}, initialState.training);

export const trainingsReducer = handleActions({
  [ combineActions(actions.fetchTrainings) ]: handleRequest,
  [ combineActions(actions.fetchTrainingsSuccess) ]: handlePageableRequestSuccess,
  [ combineActions(actions.fetchTrainingsError) ]: handleRequestError
}, initialState.trainings);

export const trainingElementReducer = handleActions({
  [ combineActions(actions.createTrainingElement, actions.fetchTrainingElement) ]: handleRequest,
  [ combineActions(actions.createTrainingElementSuccess, actions.fetchTrainingElementSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.createTrainingElementError, actions.fetchTrainingElementError) ]: handleRequestError
}, initialState.trainingElement);

export const trainingElementsReducer = handleActions({
  [ combineActions(actions.fetchTrainingElements) ]: handleRequest,
  [ combineActions(actions.fetchTrainingElementsSuccess) ]: handlePageableRequestSuccess,
  [ combineActions(actions.fetchTrainingElementsError) ]: handleRequestError
}, initialState.trainingElements);
