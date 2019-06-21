import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import UserForm from 'components/user/UserForm';

import { hideModal } from 'actions/modalActions';
import { updateUser } from 'actions/userActions';
import { defaultMessage } from 'i18n/defineMessages';

const userMessages = defaultMessage.user;

const EditUserModal = (props) => {
  const { user, submitText, resetText, dispatch } = props;

  console.log("EditUserModal - element: ", user);

  const handleSubmit = data => {
    console.log("EditUserModal - data:", data);
    // console.log("EditUserModal - time: ", data.time, ', time parsed: ', data.time.format('HH:mm'))
    dispatch(updateUser(data));
    dispatch(hideModal());
  }

  return (
    <Modal show={true} onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage {...userMessages.edit}/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm
          onSubmit={handleSubmit}
          initialValues={user}
          resetBtnText={resetText}
          submitBtnText={submitText}
          />
      </Modal.Body>
    </Modal>
  );
}

export default connect(
  (state, ownProps) => ({
    user: ownProps.user,
  })
)(EditUserModal)
