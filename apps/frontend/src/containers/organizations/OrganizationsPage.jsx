import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import OrganizationsList from 'components/organization/OrganizationsList';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
import { Enums } from '@startext/ipsc';
import { fetchOrganizations } from 'actions/organizationActions';
import { getLinksSelector, getOrganizationsSelector } from 'selectors';
import { showModal } from 'actions/modalActions';

const common = defaultMessage.common;
const navigationMessages = defaultMessage.navigation;
const pageMessages = defaultMessage.pages.organizations;

class OrganizatiosPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      powerFactor: Enums.PowerFactors.MINOR
    };
  }

  componentDidMount() {
    const { fetchOrganizations, organizations: {requestParams} } = this.props;
    fetchOrganizations(requestParams);
  }

  handleSubmit = data => {
    console.log('handleSubmit', data);
  }

  handleCreateOrganization = e => {
    e.preventDefault();
    console.log('handleCreateOrganization');

    const modal = {
      modalType: 'CREATE_ORGANIZATION',
      modalProps: {
        userId: 'auk',
        userName: 'Alexey Ukhov',
      }
    };
    this.props.showModal(modal);
  }

  render() {
    const { organizations, links, intl: { formatMessage } } = this.props;
    const crumbs = [
      {
        url: 'fake url',
        icon: 'fa-home',
        text: common.breadcrumb.home,
      },
      {
        url: 'fake yrl 2',
        icon: 'fa-globe',
        text: navigationMessages.navItem.organizations,
      },
    ];

    return (
      <React.Fragment>
        <Breadcrumbs header={pageMessages.title} crumbs={crumbs} />
        <Page title={formatMessage(pageMessages.title)}>
          <Page.ContainerWrap>
            <Page.Container size="col-md-12">
              <Page.Header>
                <h5>{formatMessage(pageMessages.header)}</h5>
                <Page.Tools>
                  <Link to={links.organizations.url} className="btn btn-primary btn-xs">
                    <FormattedMessage {...common.create} />
                  </Link>
                  <span className="input-group-btn">
                    <button type="button" className='btn btn-primary btn-xs active' onClick={this.handleCreateOrganization}>
                      <FormattedMessage {...common.create} />
                    </button>
                  </span>
                </Page.Tools>
              </Page.Header>
              <Page.Content>
                <OrganizationsList
                  data={organizations}
                  links={links}/>
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
  return {
    links: getLinksSelector(state),
    organizations: getOrganizationsSelector(state),
  };
}

const mapDispatchToProps = {
  fetchOrganizations,
  showModal,
}

export default WithLayout(connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrganizatiosPage)));