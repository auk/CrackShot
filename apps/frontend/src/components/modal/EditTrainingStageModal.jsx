import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import TrainingStageForm from 'components/training/TrainingStageForm';

import { hideModal } from 'actions/modalActions';
import { createTrainingStage } from 'actions/trainingActions';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.training;

const EditTrainingStageModal = (props) => {
  const { submitText, resetText, dispatch } = props;
  const { stage, trainingElements } = props;

  const handleSubmit = data => {
    console.log("EditTrainingStageModal - data:", data);
    dispatch(createTrainingStage(data));
    dispatch(hideModal());
  }

  // console.log("EditTrainingStageModal - training:", training);
  // console.log("EditTrainingStageModal - training elements:", trainingElements);
  // console.log("EditTrainingStageModal - initial values:", initialValues);

  const initialValues = {
    name: stage.name,
    // trainingId: trainingState.content.id,
    // trainingTitle: this.getTrainingTime(trainingState.content)
  }

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
          // training={training}
          stage={stage}
          trainingElements={trainingElements}
          initialValues={initialValues}
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
)(EditTrainingStageModal)
