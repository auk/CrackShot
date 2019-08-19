import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import TrainingForm from 'components/training/TrainingForm';
import * as taxonomyService from 'services/taxonomyService';

import { hideModal } from 'actions/modalActions';
import { createTraining } from 'actions/trainingActions';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.training;

const CreateTrainingModal = (props) => {
  const { submitText, resetText, dispatch } = props;
  const { organizationsTaxonomy, usersTaxonomy, trainingElementsTaxonomy, initialValues } = props;

  const handleSubmit = data => {
    dispatch(createTraining(data));
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
        <TrainingForm
          onSubmit={handleSubmit}
          resetBtnText={resetText}
          submitBtnText={submitText}
          elements={taxonomyService.taxonomyToOptions(trainingElementsTaxonomy)}
          organizations={taxonomyService.taxonomyToOptions(organizationsTaxonomy)}
          users={taxonomyService.taxonomyToOptions(usersTaxonomy)}
          initialValues={initialValues}
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
)(CreateTrainingModal)
