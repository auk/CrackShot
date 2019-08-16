import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { hideModal } from 'actions/modalActions';
import { deleteTrainingStage } from 'actions/trainingActions';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.modal.delete_trainingStage;
const common = defaultMessage.common;

const DeleteTrainingStageModal = (props) => {
  const { stage, dispatch } = props;

  return (
    <Modal show={true} onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage {...messages.title} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="m-b-n"><FormattedMessage {...messages.confirm} values={{ name: stage.name }}/></p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={() => {
          dispatch(deleteTrainingStage({ trainingId: stage.training.id, stageId: stage.id }));
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
    TrainingStage: { name: ownProps.TrainingStageName, id: ownProps.TrainingStageId },
  })
)(DeleteTrainingStageModal)
