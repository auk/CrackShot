import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
import { Enums } from '@startext/ipsc';
import { getLinksSelector } from 'selectors';

import OrganizationForm from 'components/organization/OrganizationForm';
import UserForm from 'components/user/UserForm';

const messages = defaultMessage.home;
const common = defaultMessage.common;

class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      powerFactor: Enums.PowerFactors.MINOR
    };
  }

  render() {
    const { links, intl: { formatMessage } } = this.props;
    const crumbs = [
      {
        url: links.home.url,
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
              <Page.Header><h5>Major</h5></Page.Header>
              <Page.Content>
                <div className="text-center m-t-lg">
                  <FormattedMessage {...messages.welcome}>
                    {text => <h1>{text}</h1>}
                  </FormattedMessage>
                  <FormattedMessage {...messages.about}>
                    {text => <h3>{text}</h3>}
                  </FormattedMessage>
                  <p>
                    <FormattedMessage {...messages.intro} values={{ br: <br /> }} />
                  </p>
                  <br />
                  <br />
                  <Link to="/timer" className="btn btn-outline btn-primary">
                    <FormattedMessage {...messages.start} values={{ arr: <span>&rarr;</span> }} />
                  </Link>
                </div>
              </Page.Content>
            </Page.Container>
            <div className="col-md-6">
              <Page.Container>
              <Page.Header><h5>Organization</h5></Page.Header>
                <Page.Content>
                  <OrganizationForm/>
                </Page.Content>
              </Page.Container>
              <Page.Container>
              <Page.Header><h5>User</h5></Page.Header>
                <Page.Content>
                  <UserForm/>
                </Page.Content>
              </Page.Container>
            </div>
          </Page.ContainerWrap>
        </Page>
      </React.Fragment>
    )
  }
}

HomePage.propTypes = {
  intl: intlShape.isRequired,
  links: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    links: getLinksSelector(state),
  };
}

export default WithLayout(connect(mapStateToProps)(injectIntl(HomePage)));