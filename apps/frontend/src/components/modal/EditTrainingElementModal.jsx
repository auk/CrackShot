import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import TrainingElementForm from 'components/training/TrainingElementForm';

import { hideModal } from 'actions/modalActions';
import { updateTrainingElement } from 'actions/trainingActions';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.training;

const EditTrainingElementModal = (props) => {
  const { element, submitText, resetText, dispatch } = props;

  console.log("EditTrainingElementModal - element: ", element);

  const handleSubmit = data => {
    console.log("EditTrainingElementModal - data:", data);
    // console.log("EditTrainingElementModal - time: ", data.time, ', time parsed: ', data.time.format('HH:mm'))
    dispatch(updateTrainingElement(data));
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
          initialValues={element}
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
    element: ownProps.element,
    // validate: (values, props) => {
    //   console.log("values: ", values, ", props:", props)
    //   return { name: "required" };
    // }
  })
)(EditTrainingElementModal)
