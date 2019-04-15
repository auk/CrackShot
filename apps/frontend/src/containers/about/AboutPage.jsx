import React from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { defaultMessage } from '../../i18n/defineMessages';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';

const messages = defaultMessage.about;
const common = defaultMessage.common;

const AboutPage = (props) => {
  const { formatMessage } = props.intl;
  const crumbs = [{
    url: '',
    icon: 'fa-folder-open',
    text: common.breadcrumb.about
  }];

  return (
    <Page title={formatMessage(messages.title)}>
      <Breadcrumbs header={messages.h2} crumbs={crumbs} />
      <Page.Container>
        <Page.Header>
          <h5><FormattedMessage {...messages.h2} /></h5>
        </Page.Header>
        <Page.Content>
          <div className="text-center m-t-lg">
            <h1>Sample example of second view</h1>
            <small>Written in Minor.js component</small>
          </div>
        </Page.Content>
      </Page.Container>
    </Page>
  )
}

AboutPage.propTypes = {
  intl: intlShape.isRequired,
}

export default WithLayout(injectIntl(AboutPage));