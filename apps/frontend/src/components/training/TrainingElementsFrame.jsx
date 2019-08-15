import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { findObjectByID } from 'services/taxonomyService';
import Page from 'components/common/pageTemplate/Page';

import { defaultMessage } from 'i18n/defineMessages';

const commonMessages = defaultMessage.common;

const TrainingElementsList = (props) => {
  const { data, trainingElements } = props;

<<<<<<< HEAD:apps/frontend/src/components/training/TrainingElementsList.jsx
  const getTrainingElementById = id => {
    // console.log("Training elements:", trainingElements);
    // return id;
    return trainingElements ? trainingElements.find(te => te.id === id) : undefined;
  } 
  
=======
>>>>>>> feature-training-stage:apps/frontend/src/components/training/TrainingElementsFrame.jsx
  const getTrainingElementName = id => {
    const trainingElement = findObjectByID(id, trainingElements);
    return trainingElement ? trainingElement.name : id;
  }

  return (
    <React.Fragment>
      <Page.ContainerWrap>
        <Page.Container>
          <Page.Header><h5>Training elements</h5></Page.Header>
          <Page.Content>
            <ul>
            { data && data.map((id) =>
              <li key={id}>{getTrainingElementName(id)}</li>
            )}
            { !data && 
              <FormattedMessage {...commonMessages.no_data} />
            }
            </ul>
          </Page.Content>
        </Page.Container>
      </Page.ContainerWrap>

    </React.Fragment>
  )
}

TrainingElementsList.propTypes = {
  intl: intlShape.isRequired,
  // trainingId: PropTypes.number.isRequired,
  trainingElements: PropTypes.array.isRequired,
}

export default injectIntl(TrainingElementsList);