import React from 'react';
// import { Link } from 'react-router-dom';
import { injectIntl, intlShape/*, FormattedMessage*/ } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import SmartStageResultForm from 'components/stage/SmartStageResultForm';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
import { Enums } from '@startext/ipsc';

const messages = defaultMessage.home;
const common = defaultMessage.common;

class StageResultsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      powerFactor: Enums.PowerFactors.MINOR
    };
  }

  handleSubmit = data => {
    console.log('handleSubmit', data);
  }

  render() {
    const { intl: { formatMessage } } = this.props;
    const crumbs = [
      {
        url: 'fake url',
        icon: 'fa-bank',
        text: common.breadcrumb.home,
      },
      {
        url: 'fake yrl 2',
        icon: 'fa-pencil',
        text: common.breadcrumb.about,
      },
    ];

    return (
      <React.Fragment>
        <Breadcrumbs header={messages.title} crumbs={crumbs} />
        <Page title={formatMessage(messages.title)}>
          <Page.ContainerWrap>
            <Page.Container size="col-md-6">
              <Page.Header><h5>Minor</h5></Page.Header>
              <Page.Content>
              <SmartStageResultForm
                  powerFactor={Enums.PowerFactors.MINOR}
                />
              </Page.Content>
            </Page.Container>
          </Page.ContainerWrap>
        </Page>
      </React.Fragment>
    )
  }
}

StageResultsPage.propTypes = {
  intl: intlShape.isRequired,
}

export default WithLayout(injectIntl(StageResultsPage));