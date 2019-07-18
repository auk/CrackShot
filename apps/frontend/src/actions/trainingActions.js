import { createSimpleActions, createRequestParamsActions } from './actionFactories';

export const { createTraining, createTrainingSuccess, createTrainingError } = createSimpleActions('CREATE_TRAINING');
export const { fetchTraining, fetchTrainingSuccess, fetchTrainingError } = createSimpleActions('FETCH_TRAINING');
export const { updateTraining, updateTrainingSuccess, updateTrainingError } = createSimpleActions('UPDATE_TRAINING');

export const { fetchTrainings, fetchTrainingsSuccess, fetchTrainingsError } = createRequestParamsActions('FETCH_TRAININGS');

export const { createTrainingElement, createTrainingElementSuccess, createTrainingElementError } = createSimpleActions('CREATE_TRAINING_ELEMENT');
export const { deleteTrainingElement, deleteTrainingElementSuccess, deleteTrainingElementError } = createSimpleActions('DELETE_TRAINING_ELEMENT');
export const { fetchTrainingElement, fetchTrainingElementSuccess, fetchTrainingElementError } = createSimpleActions('FETCH_TRAINING_ELEMENT');
export const { updateTrainingElement, updateTrainingElementSuccess, updateTrainingElementError } = createSimpleActions('UPDATE_TRAINING_ELEMENT');

export const { createTrainingStage, createTrainingStageSuccess, createTrainingStageError } = createSimpleActions('CREATE_TRAINING_STAGE');
export const { deleteTrainingStage, deleteTrainingStageSuccess, deleteTrainingStageError } = createSimpleActions('DELETE_TRAINING_STAGE');
export const { fetchTrainingStage, fetchTrainingStageSuccess, fetchTrainingStageError } = createSimpleActions('FETCH_TRAINING_STAGE');
export const { updateTrainingStage, updateTrainingStageSuccess, updateTrainingStageError } = createSimpleActions('UPDATE_TRAINING_STAGE');

export const { fetchTrainingElements, fetchTrainingElementsSuccess, fetchTrainingElementsError } = createRequestParamsActions('FETCH_TRAINING_ELEMENTS');