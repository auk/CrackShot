import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import { hideModal } from 'actions/modalActions';
// import { revokeUser } from 'actions/workspaceUsersActions';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.organization;
const common = defaultMessage.common;

const CreateOrganizationModal = ({ user, wid, dispatch }) => (
  <Modal show={true} onHide={() => dispatch(hideModal())}>
    <Modal.Header closeButton>
      <Modal.Title>
        <FormattedMessage {...messages.create}/>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className="m-b-n"><FormattedMessage {...messages.text}/> <b>{user.name}</b>?</p>
    </Modal.Body>
    <Modal.Footer>
      <button className="btn btn-primary" onClick={() => {
        // dispatch(revokeUser(wid, user.id));
        dispatch(hideModal());
      }}>
        <FormattedMessage {...common.yes}/>
      </button>
      <button className="btn btn-white" onClick={() => dispatch(hideModal())}>
        <FormattedMessage {...common.no}/>
      </button>
    </Modal.Footer>
  </Modal>
)

export default connect(
  (state, ownProps) => ({
    user: { id: ownProps.userId, name: ownProps.userName }
  })
)(CreateOrganizationModal)
