import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import TrainingStageForm from 'components/training/TrainingStageForm';

import { hideModal } from 'actions/modalActions';
import { createTrainingElement } from 'actions/trainingActions';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.training;

const CreateTrainingStageModal = (props) => {
  const { submitText, resetText, dispatch } = props;
  const { training, trainingElements, initialValues } = props;

  const handleSubmit = data => {
    console.log("CreateTrainingStageModal - data:", data);
    dispatch(createTrainingElement(data));
    dispatch(hideModal());
  }

  console.log("Training:", training);
  console.log("Training elements:", trainingElements);

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
          training={training}
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
)(CreateTrainingStageModal)