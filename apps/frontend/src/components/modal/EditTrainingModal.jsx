import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import TrainingForm from 'components/training/TrainingForm';

import { hideModal } from 'actions/modalActions';
import { updateTraining } from 'actions/trainingActions';
import * as taxonomyService from 'services/taxonomyService';

import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.training;

const EditTrainingModal = (props) => {
  const { submitText, resetText, dispatch } = props;
  const { training } = props;
  const { trainingElementsTaxonomy, organizationsTaxonomy, usersTaxonomy } = props;

  const handleSubmit = data => {
    console.log("EditTrainingModal - data:", data);
    dispatch(updateTraining(data));
    dispatch(hideModal());
  }

  const participantIDs = training.participants.map(p => p.user.id);
  console.assert(participantIDs);

  const initialValues = {
    id: training.id,
    date: training.date,
    time: training.time,
    organization: taxonomyService.mapIDsToOptions( [training.organization.id ], organizationsTaxonomy),
    user: taxonomyService.mapIDsToOptions(participantIDs, usersTaxonomy),
    element: taxonomyService.mapIDsToOptions(training.trainingElements, trainingElementsTaxonomy)
    // name: stage.name,
    // trainingId: training.id,
    // trainingTitle: trainingService.getTrainingTime(training),
    // element: taxonomyService.mapIDsToOptions(stage.trainingElements, trainingElementsTaxonomy),
    // shots: stage.shots
  }

  console.log("EditTrainingModal - training:", training);
  // console.log("EditTrainingModal - stage:", stage);
  // console.log("EditTrainingModal - training elements taxonomy:", trainingElementsTaxonomy);
  // console.log("EditTrainingModal - initial values:", initialValues);

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
    training: ownProps.training
    // user: ownProps.initialValues.user,
    // validate: (values, props) => {
    //   console.log("values: ", values, ", props:", props)
    //   return { name: "required" };
    // }
  })
)(EditTrainingModal)
