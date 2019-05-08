import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import OrganizationForm from 'components/organization/OrganizationForm';

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
      <OrganizationForm/>
    </Modal.Body>
    <Modal.Footer>
      <button className="btn btn-primary" onClick={() => {
        // dispatch(revokeUser(wid, user.id));
        dispatch(hideModal());
      }}>
        <FormattedMessage {...common.create}/>
      </button>
      <button className="btn btn-white" onClick={() => dispatch(hideModal())}>
        <FormattedMessage {...common.cancel}/>
      </button>
    </Modal.Footer>
  </Modal>
)

export default connect(
  (state, ownProps) => ({
    user: { id: ownProps.userId, name: ownProps.userName },
    validate: (values, props) => {
      console.log("values: ", values, ", props:", props)
      return { name: "required" };
    }

  })
)(CreateOrganizationModal)
