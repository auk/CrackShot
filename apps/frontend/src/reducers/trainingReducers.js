import { handleActions, combineActions } from 'redux-actions';
import { handleRequest, handleRequestSuccess, handlePageableRequestSuccess, handleRequestError } from './reducerFactories';
import * as actions from '../actions/trainingActions';
import initialState from './initialState';

export const trainingsReducer = handleActions({
  [ combineActions(actions.fetchTrainings) ]: handleRequest,
  [ combineActions(actions.fetchTrainingsSuccess) ]: handlePageableRequestSuccess,
  [ combineActions(actions.fetchTrainingsError) ]: handleRequestError
}, initialState.trainings);

export const trainingReducer = handleActions({
  [ combineActions(actions.createTraining, actions.fetchTraining) ]: handleRequest,
  [ combineActions(actions.createTrainingSuccess, actions.fetchTrainingSuccess) ]: handleRequestSuccess,
  [ combineActions(actions.createTrainingError, actions.fetchTrainingError) ]: handleRequestError
}, initialState.training);