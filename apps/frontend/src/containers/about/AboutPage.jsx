import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { defaultMessage } from '../../i18n/defineMessages';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { getLinksSelector } from 'selectors';

const messages = defaultMessage.about;
const commonMessages = defaultMessage.common;

const AboutPage = (props) => {
  const { links, intl: { formatMessage } } = props;

  const crumbs = [
    {
      url: links.home.url,
      icon: 'fa-home',
      text: commonMessages.breadcrumb.home,
    },
    {
      url: '',
      icon: 'fa-folder-open',
      text: commonMessages.breadcrumb.about
    }
  ];

  return (
    <React.Fragment>
      <Breadcrumbs header={messages.title} crumbs={crumbs} />
      <Page title={formatMessage(messages.title)}>
        <Page.ContainerRow>
          <Page.Container size="col-md-12">
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
        </Page.ContainerRow>
      </Page>
    </React.Fragment>
  )
}

AboutPage.propTypes = {
  intl: intlShape.isRequired,
  links: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    links: getLinksSelector(state),
  };
}

export default WithLayout(connect(mapStateToProps)(injectIntl(AboutPage)));