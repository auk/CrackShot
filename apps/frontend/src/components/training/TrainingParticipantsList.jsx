import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { LinkContainer } from 'react-router-bootstrap';
import { MenuItem } from 'react-bootstrap';
import Page from 'components/common/pageTemplate/Page';

import { defaultMessage } from 'i18n/defineMessages';
import Paginate from 'components/common/paginate/Paginate';
import ActionMenu from 'components/actionMenu/ActionMenu';
import Table, { HeadItem } from 'components/common/table/Table';

const common = defaultMessage.common;
// const trainingMessage = defaultMessage.training;

const TrainingParticipantsList = props => {
  const { data, intl: { formatMessage } } = props;

  return (
    <React.Fragment>
      <Page.ContainerWrap>
        <Page.Container>
          <Page.Header><h5>Training participants</h5></Page.Header>
          <Page.Content>

          { data && 
            <ul>
              { data.map(u => 
                <li>{u.name}</li>
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
  data: PropTypes.object.isRequired,
  // trainingElements: PropTypes.object.isRequired,
}

export default injectIntl(TrainingParticipantsList);
