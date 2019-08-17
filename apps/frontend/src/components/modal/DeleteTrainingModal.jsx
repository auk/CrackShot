import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { hideModal } from 'actions/modalActions';
import { deleteTraining } from 'actions/trainingActions';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.modal.deleteTraining;
const common = defaultMessage.common;

const DeleteTrainingModal = (props) => {
  const { training, name, dispatch } = props;

  return (
    <Modal show={true} onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage {...messages.title} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="m-b-n"><FormattedMessage {...messages.confirm} values={{ name }}/></p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={() => {
          dispatch(deleteTraining(training.id));
          dispatch(hideModal());
        }}>
          <FormattedMessage {...common.yes} />
        </button>
        <button className="btn btn-white" onClick={() => dispatch(hideModal())}>
          <FormattedMessage {...common.no} />
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default connect(
  (state, ownProps) => ({
    // TrainingStage: { name: ownProps.TrainingStageName, id: ownProps.TrainingStageId },
  })
)(DeleteTrainingModal)
