import React from 'react';
import { connect } from 'react-redux';
// import Datetime from 'react-datetime';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
// import { Enums } from '@startext/ipsc';
import { getCurrentUserSelector, getLinksSelector, userToOptionSelector,
  getOrganizationsSelector, getOrganizationsOptionsSelector,
  getUsersSelector, getUsersOptionsSelector } from 'selectors';
import { createTraining } from 'actions/trainingActions';
import { fetchOrganizations } from 'actions/organizationActions';
import { fetchUsers } from 'actions/userActions';
import OrganizationForm from 'components/organization/OrganizationForm';
import TrainingForm from 'components/training/TrainingForm';
import UserForm from 'components/user/UserForm';
import userAuthIcon from 'assets/img/profile.jpg';
import moment from 'moment';

const messages = defaultMessage.home;
const common = defaultMessage.common;

class HomePage extends React.Component {

  componentDidMount() {
    const { fetchOrganizations, fetchUsers, organizations, users } = this.props;
    fetchOrganizations(organizations.requestParams);
    fetchUsers(users.requestParams);
  }

  handleSubmit = e => {
    // e.preventDefault();
    console.log(e)
  }

  handleCreateTraining = data => {
    console.log('handleCreateTraining:', data)
    this.props.createTraining(data)
  }

  render() {
    const { currentUser, links, organizationsOptions, selectedOrganizationsOptions, usersOptions, intl: { formatMessage } } = this.props;
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

    const selectedUsersOptions = [ userToOptionSelector(currentUser) ];

    const values = {
      organization: organizationsOptions ? organizationsOptions[0]: null,
      phone: "+7-55-555",
      users: selectedUsersOptions,
      date: moment()
    }

    // console.log("user options: ", values);
    // console.log("current user options: ", selectedUsersOptions);

    return (
      <React.Fragment>
        <Breadcrumbs header={messages.title} crumbs={crumbs} />
        <Page title={formatMessage(messages.title)}>
          
          <div className="row m-b-lg m-t-lg">
            <div className="col-md-6">

                <div className="profile-image">
                    <img src={userAuthIcon} className="rounded-circle circle-border m-b-md" alt="profile"/>
                </div>
                <div className="profile-info">
                    <div className="">
                        <div>
                            <h2 className="no-margins">
                                {currentUser.name}
                            </h2>
                            <h4>{currentUser.email}</h4>
                            <small>
                                There are many variations of passages of Lorem Ipsum available, but the majority
                                have suffered alteration in some form Ipsum available.
                            </small>
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
            <div className="col-md-6">
              <Page.Container>
                <Page.Header><h5>Last trainings</h5></Page.Header>
                <Page.Content>
                  No data
                </Page.Content>
                <Page.Content>
                  No data
                </Page.Content>
              </Page.Container>
              <Page.Container>
              <Page.Header><h5>Training</h5></Page.Header>
              <Page.Content>
                <TrainingForm
                  organizationsOptions={organizationsOptions}
                  selectedOrganizationsOptions={selectedOrganizationsOptions}
                  usersOptions={usersOptions}
                  users={selectedUsersOptions}
                  initialValues={values}
                  submitBtnText={formatMessage(common.create)}
                  onSubmit={this.handleCreateTraining}/>
              </Page.Content>
            </Page.Container>
            </div>
            
            <div className="col-md-6">
            <Page.Container>
                <Page.Header><h5>User</h5></Page.Header>
                <Page.Content>
                  <UserForm submitBtnText={formatMessage(common.create)}/>
                </Page.Content>
              </Page.Container>

              <Page.Container>
                <Page.Header><h5>Organization</h5></Page.Header>
                <Page.Content>
                  <OrganizationForm submitBtnText={formatMessage(common.create)}/>
                </Page.Content>
              </Page.Container>
            </div>
          </Page.ContainerRow>
        </Page>
      </React.Fragment>
    )
  }
}

HomePage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  links: PropTypes.object.isRequired,
  organizations: PropTypes.object.isRequired,
  organizationsOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  users: PropTypes.object.isRequired,
  usersOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  createWorkspace: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    currentUser: getCurrentUserSelector(state),
    links: getLinksSelector(state),
    organizations: getOrganizationsSelector(state),
    organizationsOptions: getOrganizationsOptionsSelector(state),
    users: getUsersSelector(state),
    usersOptions: getUsersOptionsSelector(state),
  };
}

const mapDispatchToProps = {
  fetchOrganizations,
  fetchUsers,
  createTraining
}

export default WithLayout(connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomePage)));