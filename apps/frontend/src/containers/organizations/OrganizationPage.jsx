import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
import { fetchOrganization } from 'actions/organizationActions';
import { fetchTrainings } from 'actions/trainingActions';
import { getLinksSelector, getOrganizationSelector, getTrainingsSelector } from 'selectors';
import { showModal } from 'actions/modalActions';

import TrainingsList from 'components/training/TrainingsList';

import logoIPSC from 'assets/img/IPSC.svg';

const commonMessages = defaultMessage.common;
const navigationMessages = defaultMessage.navigation;
const pageMessages = defaultMessage.pages.organization;

class OrganizationPage extends React.Component {

  componentDidMount() {
    const { fetchOrganization, fetchTrainings, match: { params } } = this.props;
    fetchOrganization(params.oid);
    fetchTrainings({ oid: params.oid});
    // fetchTrainings({ requestParams: { oid: params.oid}});
  }

  handleEditOrganization = e => {
    const { organization } = this.props;

    console.log("handleEditOrganization - organization:", organization);

    e.preventDefault();

    const modal = {
      modalType: 'EDIT_ORGANIZATION',
      modalProps: {
        organization: organization,
        resetText: this.props.intl.formatMessage(commonMessages.reset),
        submitText: this.props.intl.formatMessage(commonMessages.save)
      }
    };
    this.props.showModal(modal);
  }

  onPageChange = (page) => {
    console.log(page);
  }

  onSizeChange = (size) => {
    console.log(size);
  }

  render() {
    const { organization, links, trainings, intl: { formatMessage } } = this.props;
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

          {organization.error && <Page.Error error={organization.error} />}

          <div className="row m-b-lg m-t-lg">
            <div className="col-md-6">

                <div className="profile-image">
                    <img src={logoIPSC} className="m-b-md" alt="profile"/>
                </div>
                <div className="profile-info">
                    <div className="">
                        <div>
                            <h2 className="no-margins">
                                {organization.name}
                            </h2>
                            <h4>{organization.web}</h4>
                            <div>{organization.address}</div>
                            { organization.email && <small>Email: {organization.email}<br/></small> }
                            { organization.phone && <small>Phone: {organization.phone}<br/></small> }
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <table className="table small m-b-xs">
                    <tbody>
                    <tr>
                        <td>
                            <strong>142</strong> Projects
                        </td>
                        <td>
                            <strong>22</strong> Followers
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <strong>61</strong> Comments
                        </td>
                        <td>
                            <strong>54</strong> Articles
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>154</strong> Tags
                        </td>
                        <td>
                            <strong>32</strong> Friends
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-md-3">
                <small>Sales in last 24h</small>
                <h2 className="no-margins">206 480</h2>
                {/* <div id="sparkline1"><canvas style="display: inline-block; width: 385.75px; height: 50px; vertical-align: top;" width="385" height="50"></canvas></div> */}
            </div>
          </div>

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
                  <TrainingsList
                    data={trainings}
                    links={links}
                    onPageChange={this.onPageChange}
                    onSizeChange={this.onSizeChange}
                    showActions={false}
                    showOrganizationLink={false}
                    showPaging={false}
                  />
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
    trainings: getTrainingsSelector(state),
  };
}

const mapDispatchToProps = {
  fetchOrganization,
  fetchTrainings,
  showModal,
}

export default WithLayout(connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrganizationPage)));