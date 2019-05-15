import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import UsersList from 'components/user/UsersList';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
import { fetchUsers } from 'actions/userActions';
import { getLinksSelector, getUsersSelector } from 'selectors';
import { showModal } from 'actions/modalActions';

const common = defaultMessage.common;
const userMessages = defaultMessage.user;
const navigationMessages = defaultMessage.navigation;
const pageMessages = defaultMessage.pages.users;

class UsersPage extends React.Component {

  componentDidMount() {
    const { fetchUsers, users: { requestParams } } = this.props;
    fetchUsers(requestParams);
  }

  /*handleCreateUser = e => {
    e.preventDefault();

    const modal = {
      modalType: 'CREATE_ORGANIZATION',
      modalProps: {
        resetText: this.props.intl.formatMessage(common.reset),
        submitText: this.props.intl.formatMessage(common.create)
      }
    };
    this.props.showModal(modal);

    this.props.fetchUsers(this.props.users.requestParams);
  }*/

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
    const { users, links, intl: { formatMessage } } = this.props;
    const crumbs = [
      {
        url: links.home.url,
        icon: 'fa-home',
        text: common.breadcrumb.home,
      },
      {
        url: 'fake yrl 2',
        icon: 'fa-users',
        text: navigationMessages.navItem.users,
      },
    ];

    return (
      <React.Fragment>
        <Breadcrumbs header={pageMessages.title} crumbs={crumbs} />
        <Page title={formatMessage(pageMessages.title)}>
          <Page.ContainerRow>
            <Page.Container size="col-md-12">
              <Page.Header>
                <h5>{formatMessage(pageMessages.header)}</h5>
                <Page.Tools>
                  <span className="input-group-btn">
                    <button type="button" className='btn btn-primary btn-xs active' onClick={this.handleCreateUser}>
                      <FormattedMessage {...userMessages.create} />
                    </button>
                  </span>
                </Page.Tools>
              </Page.Header>
              <Page.Content>
                {<UsersList
                  data={users}
                  links={links}
                  onSizeChange={this.onSizeChange}
                  onPageChange={this.onPageChange}
                  onSortChange={this.onSortChange}/>}
              </Page.Content>
            </Page.Container>
          </Page.ContainerRow>
        </Page>
      </React.Fragment>
    )
  }
}

UsersPage.propTypes = {
  intl: intlShape.isRequired,
  links: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    links: getLinksSelector(state),
    users: getUsersSelector(state),
  };
}

const mapDispatchToProps = {
  fetchUsers,
  showModal,
}

export default WithLayout(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersPage)));