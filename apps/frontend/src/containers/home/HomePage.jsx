import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';
import { getCurrentUserSelector, getLinksSelector, userToOptionSelector,
  getOrganizationsSelector,
  getTrainingSelector, getTrainingsSelector,
  getTrainingElementsSelector,
  getUsersSelector } from 'selectors';
import { showModal } from 'actions/modalActions';
import { fetchOrganizations } from 'actions/organizationActions';
import { createTraining, createTrainingElement, fetchTrainings, fetchTrainingElements } from 'actions/trainingActions';
import { fetchUsers } from 'actions/userActions';
import TrainingsList from 'components/training/TrainingsList';

import * as taxonomyService from 'services/taxonomyService';
import * as trainingService from 'services/trainingService';

import userAuthIcon from 'assets/img/profile.jpg';
import moment from 'moment';

const messages = defaultMessage.home;
const trainingMessages = defaultMessage.training;
const commonMessages = defaultMessage.common;

class HomePage extends React.Component {

  componentDidMount() {
    const { fetchOrganizations, fetchTrainings, fetchTrainingElements, fetchUsers } = this.props;
    const { organizationsState, trainingElementsState, trainingsState, usersState } = this.props;

    fetchOrganizations(organizationsState.requestParams);
    fetchTrainings(trainingsState.requestParams);
    fetchTrainingElements(trainingElementsState.requestParams);
    fetchUsers(usersState.requestParams);
  }

  onClickTraining = (tr) => {
    console.log("onClickTraining - tr:", tr);
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

  handleCreateTraining = e => {
    e.preventDefault();

    const { organizationsState, trainingElementsState, usersState, currentUser } = this.props;
    const selectedUsersOptions = [ userToOptionSelector(currentUser) ];

    const modal = {
      modalType: 'CREATE_TRAINING',
      modalProps: {
        resetText: this.props.intl.formatMessage(commonMessages.reset),
        submitText: this.props.intl.formatMessage(commonMessages.create),

        organizationsTaxonomy: organizationsState.content,
        trainingElementsTaxonomy: trainingElementsState.content,
        usersTaxonomy: usersState.content,

        initialValues: {
          user: selectedUsersOptions,
          organization: organizationsState.content ? taxonomyService.taxonomyItemToOptionItem(organizationsState.content[0]) : null,
          date: moment(),
          time: moment('09:00', 'HH:mm'),
        }
      }
    };
    this.props.showModal(modal);

    this.props.fetchTrainings(this.props.trainingsState.requestParams);
  }

  handleDeleteTraining = training => {
    // console.log("handleDeleteTraining - training:", training);
    console.assert(training);

    const modal = {
      modalType: 'DELETE_TRAINING_MODAL',
      modalProps: {
        training: training,
        name: this.props.intl.formatMessage(commonMessages.training) + ' ' + trainingService.getTrainingTime(training),
      }
    };
    this.props.showModal(modal);
  }

  handleEditTraining = training => {
    console.assert(training);

    const { organizationsState, usersState, trainingElementsState } = this.props;
    // const selectedUsersOptions = [ userToOptionSelector(currentUser) ];

    const modal = {
      modalType: 'EDIT_TRAINING_MODAL',
      modalProps: {
        training: training,
        resetText: this.props.intl.formatMessage(commonMessages.reset),
        submitText: this.props.intl.formatMessage(commonMessages.create),

        organizationsTaxonomy: organizationsState.content,
        trainingElementsTaxonomy: trainingElementsState.content,
        usersTaxonomy: usersState.content,
      }
    };
    this.props.showModal(modal);
  }

  render() {
    const { currentUser, links, trainingsState, trainingState, trainingElementsState, intl: { formatMessage } } = this.props;

    const crumbs = [
      {
        url: links.home.url,
        icon: 'fa-bank',
        text: commonMessages.breadcrumb.home,
      }
    ];

    return (
      <React.Fragment>
        <Breadcrumbs header={messages.title} crumbs={crumbs} />
        <Page title={formatMessage(messages.title)}>

          {trainingsState.error && <Page.Error error={trainingsState.error} />}
          {trainingState.error && <Page.Error error={trainingState.error} />}

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
            <div className="col-md-8">
              <Page.Container>
                <Page.Header>
                  <h5>Last trainings</h5>
                  <Page.Tools>
                    <span className="input-group-btn">
                      <button type="button" className='btn btn-primary btn-xs active' onClick={this.handleCreateTraining}>
                        <FormattedMessage {...trainingMessages.create} />
                      </button>
                    </span>
                  </Page.Tools>
                </Page.Header>
                <Page.Content>
                  <TrainingsList
                    data={trainingsState}
                    links={links}
                    trainingElements={trainingElementsState.content}
                    // onClick={this.onClickTraining}
                    onDelete={this.handleDeleteTraining}
                    onEdit={this.handleEditTraining}
                    onPageChange={this.onPageChange}
                    onSizeChange={this.onSizeChange}/>
                </Page.Content>
              </Page.Container>
            </div>

            <div className="col-md-4">
              <h2>My organizations</h2>
              <br/>
              {/* <TrainingStageForm
                trainingElements={trainingElementsOptions}/> */}
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
  organizationsState: PropTypes.object.isRequired,
  trainingState: PropTypes.object,
  trainingsState: PropTypes.object.isRequired,
  trainingElementsState: PropTypes.object.isRequired,
  usersState: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    // auth: getAuthSelector(state),
    currentUser: getCurrentUserSelector(state),
    links: getLinksSelector(state),
    organizationsState: getOrganizationsSelector(state),
    trainingState: getTrainingSelector(state),
    trainingsState: getTrainingsSelector(state),
    trainingElementsState: getTrainingElementsSelector(state),
    usersState: getUsersSelector(state),
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