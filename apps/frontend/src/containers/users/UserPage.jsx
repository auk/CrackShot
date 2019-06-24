import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
import { getUserDisplayNameSelector, getCurrentUserSelector,
  getUserSelector, getUserTrainingsSelector, getUsersSelector,
  getLinksSelector, userToOptionSelector } from 'selectors';
import { fetchUser, fetchUserTrainings } from 'actions/userActions';
import userAuthIcon from 'assets/img/profile.jpg';
import UserTrainingsList from 'components/user/UserTrainingsList'

const commonMessages = defaultMessage.common;
const pageMessages = defaultMessage.home;
const trainingMessages = defaultMessage.training;

class UserPage extends React.Component {

  componentDidMount() {
    const { fetchUser, fetchUserTrainings, match: { params } } = this.props;
    console.log("params:", params);

    const uid = params.uid;
    console.assert(uid);

    fetchUser(uid);
    fetchUserTrainings({ uid });
  }

  handleSubmit = e => {
    // e.preventDefault();
    console.log(e)
  }

  onClickTraining = (tr) => {
    console.log(tr);
  }

  onPageChange = (page) => {
    console.log(page);
  }

  onSizeChange = (size) => {
    console.log(size);
  }

  /*handleCreateTrainingModal = e => {
    e.preventDefault();

    const { currentUser, user } = this.props;
    const selectedUsersOptions = [ userToOptionSelector(currentUser) ];

    const modal = {
      modalType: 'CREATE_TRAINING',
      modalProps: {
        resetText: this.props.intl.formatMessage(common.reset),
        submitText: this.props.intl.formatMessage(common.create),
        elements: trainingElementsOptions,
        organizations: organizationsOptions,
        users: usersOptions,
        initialValues: {
          user: selectedUsersOptions,
          organization: organizationsOptions ? organizationsOptions[0] : null,
          date: moment(),
          time: moment('09:00', 'HH:mm'),
        }
      }
    };
    this.props.showModal(modal);
  }*/

  render() {
    const { user, users, userTrainings, links, intl: { formatMessage } } = this.props;

    console.log("User trainings:", userTrainings);

    const crumbs = [
      {
        url: links.home.url,
        icon: 'fa-bank',
        text: commonMessages.breadcrumb.home,
      },
      {
        url: 'fake yrl 2',
        icon: 'fa-users',
        text: user ? getUserDisplayNameSelector(user) : 'User',
      },
    ];

    // const selectedUsersOptions = [ userToOptionSelector(currentUser) ];

    // console.log("users options:", usersOptions);
    // console.log("selected users options:", selectedUsersOptions);

    // const values = {
    //   organization: organizationsOptions ? organizationsOptions[0]: null,
    //   phone: "+7-555-5555",
    //   user: selectedUsersOptions,
    //   date: moment(),
    //   time: moment('09:00', 'HH:mm'),
    // }

    return (
      <React.Fragment>
        <Breadcrumbs header={pageMessages.title} crumbs={crumbs} />
        <Page title={formatMessage(pageMessages.title)}>
          
          {/* {trainings.error && <Page.Error error={trainings.error} />} */}

          <div className="row m-b-lg m-t-lg">
            <div className="col-md-6">

                <div className="profile-image">
                    <img src={userAuthIcon} className="rounded-circle circle-border m-b-md" alt="profile"/>
                </div>
                <div className="profile-info">
                    <div className="">
                        <div>
                            <h2 className="no-margins">
                                {user.name}
                            </h2>
                            <h4>{user.email}</h4>
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
                <Page.Header>
                  <h5>Last trainings</h5>
                  <Page.Tools>
                    <span className="input-group-btn">
                      <button type="button" className='btn btn-primary btn-xs active' onClick={this.handleCreateTrainingModal}>
                        <FormattedMessage {...trainingMessages.create} />
                      </button>
                    </span>
                  </Page.Tools>
                </Page.Header>
                <Page.Content>
                  <UserTrainingsList
                    data={userTrainings}
                    links={links}
                    // trainingElements={trainingElementsState.content}
                    // onClick={this.onClickTraining}
                    onPageChange={this.onPageChange}
                    onSizeChange={this.onSizeChange}/>
                </Page.Content>
              </Page.Container>
            </div>            
          </Page.ContainerRow>
        </Page>
      </React.Fragment>
    )
  }
}

UserPage.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  // currentUser: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  links: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  // organizations: PropTypes.object.isRequired,
  // organizationsOptions: PropTypes.arrayOf(PropTypes.shape({
  //   label: PropTypes.string.isRequired,
  //   value: PropTypes.string.isRequired,
  // })),
  // trainings: PropTypes.object.isRequired,
  // trainingElementsState: PropTypes.object.isRequired,
  // trainingElementsOptions: PropTypes.arrayOf(PropTypes.shape({
  //   label: PropTypes.string.isRequired,
  //   value: PropTypes.string.isRequired,
  // })),
  users: PropTypes.object.isRequired,
  // usersOptions: PropTypes.arrayOf(PropTypes.shape({
  //   label: PropTypes.string.isRequired,
  //   value: PropTypes.string.isRequired,
  // })),
}

const mapStateToProps = state => {
  return {
    // auth: getAuthSelector(state),
    currentUser: getCurrentUserSelector(state),
    links: getLinksSelector(state),
    user: getUserSelector(state),
    userTrainings: getUserTrainingsSelector(state),
    users: getUsersSelector(state),
    // organizations: getOrganizationsSelector(state),
    // organizationsOptions: getOrganizationsOptionsSelector(state),
    // trainings: getTrainingsSelector(state),
    // trainingElementsState: getTrainingElementsSelector(state),
    // trainingElementsOptions: getTrainingElementsOptionsSelector(state),
    // usersOptions: getUsersOptionsSelector(state),
  };
}

const mapDispatchToProps = {
  fetchUser,
  fetchUserTrainings,
  // fetchOrganizations,
  // fetchTrainings,
  // fetchTrainingElements,
  // fetchUsers,
  // createTraining,
  // createTrainingElement,
  // showModal
}

export default WithLayout(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserPage)));