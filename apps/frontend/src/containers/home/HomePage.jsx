import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
import { getCurrentUserSelector, getLinksSelector, userToOptionSelector,
  getOrganizationsSelector, getOrganizationsOptionsSelector,
  getTrainingsSelector,
  getTrainingElementsSelector, getTrainingElementsOptionsSelector,
  getUsersSelector, getUsersOptionsSelector } from 'selectors';
import { showModal } from 'actions/modalActions';
import { fetchOrganizations } from 'actions/organizationActions';
import { createTraining, createTrainingElement, fetchTrainings, fetchTrainingElements } from 'actions/trainingActions';
import { fetchUsers } from 'actions/userActions';
import TrainingsList from 'components/training/TrainingsList';
import userAuthIcon from 'assets/img/profile.jpg';
import moment from 'moment';

const messages = defaultMessage.home;
const trainingMessages = defaultMessage.training;
const common = defaultMessage.common;

class HomePage extends React.Component {

  componentDidMount() {
    const { fetchOrganizations, fetchTrainings, fetchTrainingElements, fetchUsers, organizations, trainings, trainingElementsState, users } = this.props;
    fetchOrganizations(organizations.requestParams);
    fetchTrainings(trainings.requestParams);
    fetchTrainingElements(trainingElementsState.requestParams);
    fetchUsers(users.requestParams);
  }

  handleSubmit = e => {
    // e.preventDefault();
    console.log(e)
  }

  handleCreateTraining = data => {
    console.log("HomePage - data:", data);
    console.log("HomePage - time: ", data.time, ', time parsed: ', data.time.format('HH:mm'))
    this.props.createTraining(data)
  }

  handleCreateTrainingElement = data => {
    console.log("HomePage - data:", data);
    this.props.createTrainingElement(data)
  }

  onClickTraining = (tr) => {
    console.log(tr);
  }

  onPageChange = (page) => {
    console.log(page);
  }

  onSizeChange = (size) => {
    console.log(size);
    console.log(this.props);
    const { user: { trainings: { requestParams } } } = this.props;
    const newRequestParams = { ...requestParams, size: size.value, page: 0 };
    console.log("params:", requestParams, ", new params:", newRequestParams);
    this.props.fetchTrainings(newRequestParams);
    // this.refetchData(newRequestParams);
  }

  handleCreateTrainingModal = e => {
    e.preventDefault();

    const { organizationsOptions, trainingElementsOptions, usersOptions, currentUser } = this.props;
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

    this.props.fetchTrainings(this.props.trainings.requestParams);
  }

  render() {
    const { currentUser, links, organizationsOptions, selectedOrganizationsOptions, usersOptions, trainings, trainingElementsState, trainingElementsOptions, intl: { formatMessage } } = this.props;

    const crumbs = [
      {
        url: links.home.url,
        icon: 'fa-bank',
        text: common.breadcrumb.home,
      }
    ];

    const selectedUsersOptions = [ userToOptionSelector(currentUser) ];

    console.log("users options:", usersOptions);
    console.log("selected users options:", selectedUsersOptions);

    const values = {
      organization: organizationsOptions ? organizationsOptions[0]: null,
      phone: "+7-555-5555",
      user: selectedUsersOptions,
      date: moment(),
      time: moment('09:00', 'HH:mm'),
    }

    return (
      <React.Fragment>
        <Breadcrumbs header={messages.title} crumbs={crumbs} />
        <Page title={formatMessage(messages.title)}>
          
          {trainings.error && <Page.Error error={trainings.error} />}

          <div className="row m-b-lg m-t-lg">
            <div className="col-md-6">

                <div className="profile-image">
                    <img src={userAuthIcon} className="rounded-circle circle-border m-b-md" alt="profile"/>
                </div>
                { currentUser && 
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
              }
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
                  <TrainingsList
                    data={trainings}
                    links={links}
                    trainingElements={trainingElementsState.content}
                    onClick={this.onClickTraining}
                    onPageChange={this.onPageChange}
                    onSizeChange={this.onSizeChange}/>
                </Page.Content>
              </Page.Container>
            </div>
            
            <div className="col-md-6">
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
  trainings: PropTypes.object.isRequired,
  trainingElementsState: PropTypes.object.isRequired,
  trainingElementsOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  users: PropTypes.object.isRequired,
  usersOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
}

const mapStateToProps = state => {
  return {
    // auth: getAuthSelector(state),
    currentUser: getCurrentUserSelector(state),
    links: getLinksSelector(state),
    organizations: getOrganizationsSelector(state),
    organizationsOptions: getOrganizationsOptionsSelector(state),
    trainings: getTrainingsSelector(state),
    trainingElementsState: getTrainingElementsSelector(state),
    trainingElementsOptions: getTrainingElementsOptionsSelector(state),
    users: getUsersSelector(state),
    usersOptions: getUsersOptionsSelector(state),
  };
}

const mapDispatchToProps = {
  fetchOrganizations,
  fetchTrainings,
  fetchTrainingElements,
  fetchUsers,
  createTraining,
  createTrainingElement,
  showModal
}

export default WithLayout(connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomePage)));