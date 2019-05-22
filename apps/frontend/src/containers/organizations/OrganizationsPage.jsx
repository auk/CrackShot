import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import OrganizationsList from 'components/organization/OrganizationsList';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
import { fetchOrganizations } from 'actions/organizationActions';
import { getLinksSelector, getOrganizationsSelector } from 'selectors';
import { showModal } from 'actions/modalActions';

const common = defaultMessage.common;
const organizationMessages = defaultMessage.organization;
const navigationMessages = defaultMessage.navigation;
const pageMessages = defaultMessage.pages.organizations;

class OrganizationsPage extends React.Component {

  componentDidMount() {
    const { fetchOrganizations, organizations: { requestParams } } = this.props;
    fetchOrganizations(requestParams);
  }

  handleCreateOrganization = e => {
    e.preventDefault();

    const modal = {
      modalType: 'CREATE_ORGANIZATION',
      modalProps: {
        resetText: this.props.intl.formatMessage(common.reset),
        submitText: this.props.intl.formatMessage(common.create)
      }
    };
    this.props.showModal(modal);

    this.props.fetchOrganizations(this.props.organizations.requestParams);
  }

  onSizeChange = (size) => {
    // const { clients: { requestParams } } = this.props;
    // const newRequestParams = { ...requestParams, size: size.value, page: 0 };
    // this.refetchData(newRequestParams);
  }

  onPageChange = (page) => {
    // const { clients: { requestParams } } = this.props;
    // const newRequestParams = { ...requestParams, page: page.selected };
    // this.refetchData(newRequestParams);
  };

  onSortChange = (field, order) => {
    // const { clients: { requestParams } } = this.props;
    // const newRequestParams = {
    //   ...requestParams,
    //   sortField: field,
    //   sortOrder: order,
    // };
    // this.refetchData(newRequestParams);
  }

  render() {
    const { organizations, links, intl: { formatMessage } } = this.props;
    const crumbs = [
      {
        url: links.home.url,
        icon: 'fa-home',
        text: common.breadcrumb.home,
      },
      {
        url: '',
        icon: 'fa-globe',
        text: navigationMessages.navItem.organizations,
      },
    ];

    return (
      <React.Fragment>
        <Breadcrumbs header={pageMessages.title} crumbs={crumbs} />
        <Page title={formatMessage(pageMessages.title)}>
          {organizations.error && <Page.Error error={organizations.error} />}
          <Page.ContainerRow>
            <Page.Container size="col-md-12">
              <Page.Header>
                <h5>{formatMessage(pageMessages.header)}</h5>
                <Page.Tools>
                  <span className="input-group-btn">
                    <button type="button" className='btn btn-primary btn-xs active' onClick={this.handleCreateOrganization}>
                      <FormattedMessage {...organizationMessages.create} />
                    </button>
                  </span>
                </Page.Tools>
              </Page.Header>
              <Page.Content>
                <OrganizationsList
                  data={organizations}
                  links={links}
                  onSizeChange={this.onSizeChange}
                  onPageChange={this.onPageChange}
                  onSortChange={this.onSortChange}/>
              </Page.Content>
            </Page.Container>
          </Page.ContainerRow>
        </Page>
      </React.Fragment>
    )
  }
}

OrganizationsPage.propTypes = {
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

export default WithLayout(connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrganizationsPage)));