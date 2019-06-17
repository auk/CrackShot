import { createSimpleActions, createRequestParamsActions } from './actionFactories';

export const { createTraining, createTrainingSuccess, createTrainingError } = createRequestParamsActions('CREATE_TRAINING');
export const { createTrainingElement, createTrainingElementSuccess, createTrainingElementError } = createRequestParamsActions('CREATE_TRAINING_ELEMENT');
export const { fetchTraining, fetchTrainingSuccess, fetchTrainingError } = createSimpleActions('FETCH_TRAINING');
export const { fetchTrainingElement, fetchTrainingElementSuccess, fetchTrainingElementError } = createSimpleActions('FETCH_TRAINING_ELEMENT');
export const { fetchTrainings, fetchTrainingsSuccess, fetchTrainingsError } = createRequestParamsActions('FETCH_TRAININGS');
export const { fetchTrainingElements, fetchTrainingElementsSuccess, fetchTrainingElementsError } = createRequestParamsActions('FETCH_TRAINING_ELEMENTS');
