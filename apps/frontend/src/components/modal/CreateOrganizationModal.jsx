import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import OrganizationForm from 'components/organization/OrganizationForm';

import { hideModal } from 'actions/modalActions';
import { createOrganization } from 'actions/organizationActions';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.organization;

const CreateOrganizationModal = (props) => {
  const { submitText, resetText, dispatch } = props;

  const handleSubmit = data => {
    console.log("CreateOrganizationModal: Handle submit, data:", data);
    const action = createOrganization(data);
    console.log("CreateOrganizationModal: action:", action);
    dispatch(action);
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
        <OrganizationForm
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
)(CreateOrganizationModal)
