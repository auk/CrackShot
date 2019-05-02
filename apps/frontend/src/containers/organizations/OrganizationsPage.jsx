import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom';
import { injectIntl, intlShape/*, FormattedMessage*/ } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import SmartStageResultForm from 'components/stage/SmartStageResultForm';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
import { Enums } from '@startext/ipsc';
import { fetchOrganizations } from 'actions/organizationActions';
import { getLinksSelector, getOrganizationsSelector } from 'selectors';

const messages = defaultMessage.home;
const common = defaultMessage.common;

class OrganizatiosPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      powerFactor: Enums.PowerFactors.MINOR
    };
  }

  componentDidMount() {
    const { fetchOrganizations/*, organizations: {requestParams}*/ } = this.props;
    fetchOrganizations(/*requestParams*/);
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

OrganizatiosPage.propTypes = {
  intl: intlShape.isRequired,
  links: PropTypes.object.isRequired,
  organizations: PropTypes.object.isRequired,
  fetchOrganizations: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  // const { auth } = state;
  return {
    links: getLinksSelector(state),
    organizations: getOrganizationsSelector(state),
  };
}

export default WithLayout(connect(mapStateToProps, { fetchOrganizations })(injectIntl(OrganizatiosPage)));