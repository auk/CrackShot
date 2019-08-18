import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FormattedMessage} from 'react-intl';

import TrainingForm from 'components/training/TrainingForm';

import { hideModal } from 'actions/modalActions';
import { updateTraining } from 'actions/trainingActions';
import * as selectors from 'selectors';
import * as taxonomyService from 'services/taxonomyService';
import * as trainingService from 'services/trainingService';

import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.training;

const EditTrainingModal = (props) => {
  const { submitText, resetText, dispatch } = props;
  const { training, stage, trainingElementsTaxonomy } = props;
  const { elements, organizations, users } = props;

  const handleSubmit = data => {
    console.log("EditTrainingModal - data:", data);
    dispatch(updateTraining(data));
    dispatch(hideModal());
  }

  const initialValues = {
    id: training.id,
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
          // trainingElements={trainingElementsTaxonomy.map(te => selectors.taxonomyItemToOptionSelector(te))}
          elements={elements}
          organizations={organizations}
          users={users}
          initialValues={initialValues}
          />
      </Modal.Body>
    </Modal>
  );
}

export default connect(
  (state, ownProps) => ({
    stage: ownProps.stage
    // user: ownProps.initialValues.user,
    // validate: (values, props) => {
    //   console.log("values: ", values, ", props:", props)
    //   return { name: "required" };
    // }
  })
)(EditTrainingModal)
