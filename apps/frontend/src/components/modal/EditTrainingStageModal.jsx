import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import TrainingStageForm from 'components/training/TrainingStageForm';

import { hideModal } from 'actions/modalActions';
import { updateTrainingStage } from 'actions/trainingActions';
import * as selectors from 'selectors';
import * as taxonomyService from 'services/taxonomyService';
import * as trainingService from 'services/trainingService';

import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.training;

const EditTrainingStageModal = (props) => {
  const { submitText, resetText, dispatch } = props;
  const { training, stage, trainingElementsTaxonomy } = props;

  const handleSubmit = data => {
    console.log("EditTrainingStageModal - data:", data);
    dispatch(updateTrainingStage(data));
    dispatch(hideModal());
  }

  const initialValues = {
    id: stage.id,
    name: stage.name,
    trainingId: training.id,
    trainingTitle: trainingService.getTrainingTime(training),
    element: taxonomyService.mapIDsToOptions(stage.trainingElements, trainingElementsTaxonomy),
    shots: stage.shots
  }

  console.log("EditTrainingStageModal - training:", training);
  console.log("EditTrainingStageModal - stage:", stage);
  console.log("EditTrainingStageModal - training elements taxonomy:", trainingElementsTaxonomy);
  console.log("EditTrainingStageModal - initial values:", initialValues);

  return (
    <Modal show={true} onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage {...messages.create}/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TrainingStageForm
          onSubmit={handleSubmit}
          resetBtnText={resetText}
          submitBtnText={submitText}
          trainingElements={trainingElementsTaxonomy.map(te => selectors.taxonomyItemToOptionSelector(te))}
          initialValues={initialValues}
          />
      </Modal.Body>
    </Modal>
  );
}

export default connect(
  (state, ownProps) => ({
    stage: ownProps.stage
    // user: ownProps.initialValues.user,
    // validate: (values, props) => {
    //   console.log("values: ", values, ", props:", props)
    //   return { name: "required" };
    // }
  })
)(EditTrainingStageModal)
