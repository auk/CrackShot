import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import TrainingStageForm from 'components/training/TrainingStageForm';

import { hideModal } from 'actions/modalActions';
import { createTrainingStage } from 'actions/trainingActions';
import { defaultMessage } from 'i18n/defineMessages';
import * as selectors from 'selectors';
import * as trainingService from 'services/trainingService';

const messages = defaultMessage.training;

const CreateTrainingStageModal = (props) => {
  const { submitText, resetText, dispatch } = props;
  const { training, trainingElementsTaxonomy, initialValues } = props;

  const handleSubmit = data => {
    console.log("CreateTrainingStageModal - data:", data);
    dispatch(createTrainingStage(data));
    dispatch(hideModal());
  }

  const modalInitialValues = {
    ...initialValues,
    trainingId: training.id,
    trainingTitle: trainingService.getTrainingTime(training)
  }

  console.log("CreateTrainingStageModal - training:", training);
  console.log("CreateTrainingStageModal - training elements taxonomy:", trainingElementsTaxonomy);
  console.log("CreateTrainingStageModal - initial values:", initialValues);

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
          initialValues={modalInitialValues}
          />
      </Modal.Body>
    </Modal>
  );
}

export default connect(
  (state, ownProps) => ({
    // user: ownProps.initialValues.user,
    // validate: (values, props) => {
    //   console.log("values: ", values, ", props:", props)
    //   return { name: "required" };
    // }
  })
)(CreateTrainingStageModal)
