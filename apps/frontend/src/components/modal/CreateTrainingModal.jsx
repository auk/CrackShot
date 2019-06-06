import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import TrainingForm from 'components/training/TrainingForm';

import { hideModal } from 'actions/modalActions';
import { createTraining } from 'actions/trainingActions';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.training;

const CreateTrainingModal = (props) => {
  const { submitText, resetText, dispatch } = props;

  const handleSubmit = data => {
    // console.log("CreateTrainingModal: Handle submit, data:", data);
    // console.log("CreateTrainingModal: action:", action);
    dispatch(createTraining(data));
    dispatch(hideModal());
  }

  return (
    <Modal show={true} onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage {...messages.create}/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TrainingForm
          onSubmit={handleSubmit} 
          resetBtnText={resetText}
          submitBtnText={submitText}/>
      </Modal.Body>
    </Modal>
  );
}

export default connect(
  (state, ownProps) => ({
    user: { id: ownProps.userId, name: ownProps.userName },
    // validate: (values, props) => {
    //   console.log("values: ", values, ", props:", props)
    //   return { name: "required" };
    // }
  })
)(CreateTrainingModal)
