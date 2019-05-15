import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
import { fetchOrganization } from 'actions/organizationActions';
import { getLinksSelector, getOrganizationSelector } from 'selectors';
import { showModal } from 'actions/modalActions';

const commonMessages = defaultMessage.common;
const navigationMessages = defaultMessage.navigation;
const pageMessages = defaultMessage.pages.organization;

class OrganizationPage extends React.Component {

  componentDidMount() {
    const { fetchOrganization, match: { params } } = this.props;
    fetchOrganization(params.oid);
  }

  handleEditOrganization = e => {
    e.preventDefault();

    const modal = {
      modalType: 'CREATE_ORGANIZATION',
      modalProps: {
        resetText: this.props.intl.formatMessage(commonMessages.reset),
        submitText: this.props.intl.formatMessage(commonMessages.create)
      }
    };
    this.props.showModal(modal);
  }

  render() {
    const { organization, links, intl: { formatMessage } } = this.props;
    const crumbs = [
      {
        url: links.home.url,
        icon: 'fa-home',
        text: commonMessages.breadcrumb.home,
      },
      {
        url: links.organizations.url,
        icon: 'fa-globe',
        text: navigationMessages.navItem.organizations,
      },
      {
        url: 'fake yrl 2',
        icon: 'fa-bank',
        text: organization.name || 'Current organization',
      },
    ];

    return (
      <React.Fragment>
        <Breadcrumbs header={pageMessages.title} crumbs={crumbs} />
        <Page title={formatMessage(pageMessages.title)}>
          <Page.ContainerRow>
            <Page.Container size="col-md-12">
              <Page.Header>
                <h5>{organization.name}</h5>
                <Page.Tools>
                  <span className="input-group-btn">
                    <button type="button" className='btn btn-primary btn-xs active' onClick={this.handleEditOrganization}>
                      <FormattedMessage {...commonMessages.edit} />
                    </button>
                  </span>
                </Page.Tools>
              </Page.Header>
              <Page.Content>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="row">
                      <div className="col-sm-4 text-sm text-right"><dt>Name:</dt></div>
                      <div className="col-sm-8 text-sm">{organization.name}</div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 text-sm text-right"><dt>Web site:</dt></div>
                      <div className="col-sm-8 text-sm">{organization.web}</div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 text-sm text-right"><dt>Email:</dt></div>
                      <div className="col-sm-8 text-sm">{organization.email}</div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 text-sm text-right"><dt>Phone:</dt></div>
                      <div className="col-sm-8 text-sm">{organization.phone}</div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="row">
                      <div className="col-sm-4 text-sm text-right"><dt>Created:</dt></div>
                      <div className="col-sm-8 text-sm">07.07.2019</div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 text-sm text-right"><dt>Address:</dt></div>
                      <div className="col-sm-8 text-sm">{organization.address}</div>
                    </div>
                  </div>
                </div>
              </Page.Content>
            </Page.Container>
            </Page.ContainerRow>
            <Page.ContainerRow>
              <Page.Container size="col-lg-4">
                <Page.Header>
                  <h5>Members</h5>
                </Page.Header>
                <Page.Content>
                  No data
                </Page.Content>
              </Page.Container>
              <Page.Container size="col-lg-4">
                <Page.Header>
                  <h5>Last trainings</h5>
                </Page.Header>
                <Page.Content>
                  No data
                </Page.Content>
              </Page.Container>
              <Page.Container size="col-lg-4">
                <Page.Header>
                  <h5>{organization.name}</h5>
                </Page.Header>
                <Page.Content>
                  No data
                </Page.Content>
              </Page.Container>
            </Page.ContainerRow>
        </Page>
      </React.Fragment>
    )
  }
}

OrganizationPage.propTypes = {
  intl: intlShape.isRequired,
  links: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  fetchOrganization: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    links: getLinksSelector(state),
    organization: getOrganizationSelector(state),
  };
}

const mapDispatchToProps = {
  fetchOrganization,
  showModal,
}

export default WithLayout(connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrganizationPage)));