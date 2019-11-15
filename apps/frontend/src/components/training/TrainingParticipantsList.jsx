import React from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Page from 'components/common/pageTemplate/Page';
import * as taxonomyService from 'services/taxonomyService';

import { defaultMessage } from 'i18n/defineMessages';

const common = defaultMessage.common;
const userDisplayFields = [ 'name', 'username', 'id' ];

const TrainingParticipantsList = props => {
  const { data } = props;

  return (
    <React.Fragment>
      <Page.ContainerWrap>
        <Page.Container>
          <Page.Header><h5>Training participants</h5></Page.Header>
          <Page.Content>

          { data &&
            <ul>
              { data.map(u =>
                <li key={u.id}>{taxonomyService.getTaxonomyField(u, userDisplayFields)}</li>
              )}
            </ul>
          }

          { !data &&
            <p>
              <FormattedMessage {...common.no_data} />
            </p>
          }
          </Page.Content>
        </Page.Container>
      </Page.ContainerWrap>
    </React.Fragment>
  )
}

TrainingParticipantsList.propTypes = {
  intl: intlShape.isRequired,
  // data: PropTypes.object.isRequired,
  // trainingElements: PropTypes.object.isRequired,
}

export default injectIntl(TrainingParticipantsList);
