import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { hideModal } from 'actions/modalActions';
import { deleteUser } from 'actions/userActions';
import { defaultMessage } from 'i18n/defineMessages';
import { getUserDisplayNameSelector } from 'selectors';

const messages = defaultMessage.modal.delete_user;
const common = defaultMessage.common;

const DeleteUserModal = (props) => {
  const { uid, name, dispatch } = props;

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
          dispatch(deleteUser(uid));
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
    user: { name: ownProps.userName, id: ownProps.userId },
    workspace: { id: ownProps.workspaceId },
  })
)(DeleteUserModal)
