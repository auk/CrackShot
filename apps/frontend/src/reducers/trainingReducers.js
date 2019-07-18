import { handleActions, combineActions } from 'redux-actions';
import { handleRequest, handleRequestSuccess, handlePageableRequestSuccess, handleRequestError, handleRequestPageableError } from './reducerFactories';
import * as actions from '../actions/trainingActions';
import initialState from './initialState';

export const trainingReducer = handleActions({
  [ combineActions(actions.createTraining, actions.fetchTraining, actions.updateTraining) ]: handleRequest,
  [ combineActions(actions.createTrainingSuccess, actions.fetchTrainingSuccess, actions.updateTrainingSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.createTrainingError, actions.fetchTrainingError, actions.updateTrainingError) ]: handleRequestError
}, initialState.training);

export const trainingsReducer = handleActions({
  [ combineActions(actions.fetchTrainings) ]: handleRequest,
  [ combineActions(actions.fetchTrainingsSuccess) ]: handlePageableRequestSuccess,
  [ combineActions(actions.fetchTrainingsError) ]: handleRequestPageableError
}, initialState.trainings);

export const trainingElementReducer = handleActions({
  [ combineActions(actions.createTrainingElement, actions.fetchTrainingElement, actions.deleteTrainingElement, actions.fetchTrainingElement) ]: handleRequest,
  [ combineActions(actions.createTrainingElementSuccess, actions.fetchTrainingElementSuccess, actions.deleteTrainingElementSuccess, actions.fetchTrainingElementSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.createTrainingElementError, actions.fetchTrainingElementError, actions.deleteTrainingElementError, actions.fetchTrainingElementError) ]: handleRequestError
}, initialState.trainingElement);

export const trainingElementsReducer = handleActions({
  [ combineActions(actions.fetchTrainingElements) ]: handleRequest,
  [ combineActions(actions.fetchTrainingElementsSuccess) ]: handlePageableRequestSuccess,
  [ combineActions(actions.fetchTrainingElementsError) ]: handleRequestPageableError
}, initialState.trainingElements);

export const trainingStageReducer = handleActions({
  [ combineActions(actions.createTrainingStage, actions.fetchTrainingStage, actions.deleteTrainingStage, actions.fetchTrainingStage) ]: handleRequest,
  [ combineActions(actions.createTrainingStageSuccess, actions.fetchTrainingStageSuccess, actions.deleteTrainingStageSuccess, actions.fetchTrainingStageSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.createTrainingStageError, actions.fetchTrainingStageError, actions.deleteTrainingStageError, actions.fetchTrainingStageError) ]: handleRequestError
}, initialState.training.stage);
