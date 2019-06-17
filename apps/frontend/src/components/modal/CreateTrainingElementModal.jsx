import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import TrainingElementForm from 'components/training/TrainingElementForm';

import { hideModal } from 'actions/modalActions';
import { createTrainingElement } from 'actions/trainingActions';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.training;

const CreateTrainingElementModal = (props) => {
  const { submitText, resetText, dispatch } = props;
  const { users, organizations, initialValues } = props;
  const { user } = props;

  const handleSubmit = data => {
    console.log("CreateTrainingElementModal - data:", data);
    // console.log("CreateTrainingElementModal - time: ", data.time, ', time parsed: ', data.time.format('HH:mm'))
    dispatch(createTrainingElement(data));
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
        <TrainingElementForm
          onSubmit={handleSubmit} 
          resetBtnText={resetText}
          submitBtnText={submitText}
          // initialValues={initialValues}
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
)(CreateTrainingElementModal)
