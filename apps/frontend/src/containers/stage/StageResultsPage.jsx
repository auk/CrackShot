import React from 'react';
// import { Link } from 'react-router-dom';
import { injectIntl, intlShape/*, FormattedMessage*/ } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import SmartStageResultForm from 'components/stage/SmartStageResultForm';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
import { Enums } from '@startext/ipsc';

const common = defaultMessage.common;
const pageMessages = defaultMessage.pages.calculator;
const navigationMessages = defaultMessage.navigation;

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
        icon: 'fa-home',
        text: common.breadcrumb.home,
      },
      {
        url: 'fake yrl 2',
        icon: 'fa-calculator',
        text: navigationMessages.navItem.calculator,
      },
    ];

    return (
      <React.Fragment>
        <Breadcrumbs header={pageMessages.title} crumbs={crumbs} />
        <Page title={formatMessage(pageMessages.title)}>
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