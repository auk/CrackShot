import { createSimpleActions, createRequestParamsActions } from './actionFactories';

export const { createTraining, createTrainingSuccess, createTrainingError } = createRequestParamsActions('CREATE_TRAINING');
export const { fetchTrainings, fetchTrainingsSuccess, fetchTrainingsError } = createSimpleActions('FETCH_TRAININGS');
export const { fetchTraining, fetchTrainingSuccess, fetchTrainingError } = createSimpleActions('FETCH_TRAINING');
