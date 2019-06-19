import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import OrganizationForm from 'components/organization/OrganizationForm';

import { hideModal } from 'actions/modalActions';
import { updateOrganization } from 'actions/organizationActions';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.organization;

const EditOrganizationModal = (props) => {
  const { organization, submitText, resetText, dispatch } = props;

  const handleSubmit = data => {
    // console.log("EditOrganizationModal: Handle submit, data:", data);
    // console.log("EditOrganizationModal: action:", action);
    dispatch(updateOrganization(data));
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
          initialValues={organization}
          onSubmit={handleSubmit} 
          resetBtnText={resetText}
          submitBtnText={submitText}/>
      </Modal.Body>
    </Modal>
  );
}

export default connect(
  (state, ownProps) => ({
    organization: ownProps.organization
    // user: { id: ownProps.userId, name: ownProps.userName },
    // validate: (values, props) => {
    //   console.log("values: ", values, ", props:", props)
    //   return { name: "required" };
    // }
  })
)(EditOrganizationModal)
