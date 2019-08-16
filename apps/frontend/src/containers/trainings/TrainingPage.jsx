import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import Page from 'components/common/pageTemplate/Page';
import List from 'components/common/pageTemplate/List';
import WithLayout from 'containers/layouts/WithLayout';
import { defaultMessage } from 'i18n/defineMessages';
import { getLinksSelector, getTrainingSelector, getTrainingElementsSelector, getTrainingElementsOptionsSelector, getTrainingStageSelector, getTrainingStagesSelector } from 'selectors';
import { fetchTraining, fetchTrainingElements, fetchTrainingStages } from 'actions/trainingActions';
import { showModal } from 'actions/modalActions';
import TrainingElementsFrame from 'components/training/TrainingElementsFrame';
import TrainingParticipantsList from 'components/training/TrainingParticipantsList';

import { MenuItem } from 'react-bootstrap';
import ActionMenu from 'components/actionMenu/ActionMenu';
import { mapIDsToObjects } from 'services/taxonomyService';

const commonMessages = defaultMessage.common;
const navigationMessages = defaultMessage.navigation;
const pageMessages = defaultMessage.pages.training;

class TrainingPage extends React.Component {

  componentDidMount() {
    const { fetchTraining, fetchTrainingElements, fetchTrainingStages, trainingElementsState: { requestParams }, match: { params } } = this.props;
    const { trainingStagesState } = this.props;
    fetchTraining(params.tid);
    fetchTrainingElements(requestParams);
    fetchTrainingStages(params.tid, trainingStagesState.requestParams);
  }

  getTrainingTime(training) {
    if (training) {
      return training.date + (training.time ? ' ' + training.time : '');
    }
    return ''
  }

  handleCreateTrainingStage = e => {
    e.preventDefault();

    const { trainingState, trainingElementsState, intl: { formatMessage } } = this.props;
    const stages = trainingState.stages.content;
    const stagesCount = stages ? stages.length + 1 : 1;

    const modal = {
      modalType: 'CREATE_TRAINING_STAGE_MODAL',
      modalProps: {
        resetText: this.props.intl.formatMessage(commonMessages.reset),
        submitText: this.props.intl.formatMessage(commonMessages.create),
        training: trainingState.content,
        trainingElementsTaxonomy: trainingElementsState.content,
        initialValues: {
          name: formatMessage(commonMessages.stage) + " " + stagesCount,
        }
      }
    };
    this.props.showModal(modal);
  }

  handleEditTrainingStage = stage => {
    const { trainingState, trainingElementsState } = this.props;
    const modal = {
      modalType: 'EDIT_TRAINING_STAGE_MODAL',
      modalProps: {
        resetText: this.props.intl.formatMessage(commonMessages.reset),
        submitText: this.props.intl.formatMessage(commonMessages.save),
        training: trainingState.content,
        stage: stage,
        trainingElementsTaxonomy: trainingElementsState.content,
      }
    };

    this.props.showModal(modal);
  }

  handleDeleteTrainingStage = stage => {
    const modal = {
      modalType: 'DELETE_TRAINING_STAGE_MODAL',
      modalProps: {
        resetText: this.props.intl.formatMessage(commonMessages.reset),
        submitText: this.props.intl.formatMessage(commonMessages.save),
        stage: stage
      }
    };

    this.props.showModal(modal);
  }

  render() {
    const { trainingState, trainingElementsState, trainingStageState, trainingStagesState, links, intl: { formatMessage } } = this.props;
    // const { handleCreateElement, onSizeChange, onSortChange, onPageChange } = this.props;

    const training = trainingState.content;
    const stages = trainingState.stages.content;
    console.assert(stages);
    console.assert(Array.isArray(stages), "Expect array, got: " + JSON.stringify(stages) + ", training state: " + JSON.stringify(trainingState));

    const time = this.getTrainingTime(training);

    const crumbs = [
      {
        url: links.home.url,
        icon: 'fa-home',
        text: commonMessages.breadcrumb.home,
      },
      {
        url: '',
        icon: 'fa-globe',
        text: formatMessage(navigationMessages.navItem.training, { time }),
      },
    ];

    const title = formatMessage(pageMessages.title, { time });

    return (
      <React.Fragment>
        <Breadcrumbs header={{ ...pageMessages.title, values: { time }}} crumbs={crumbs} values={time}/>
        <Page title={title}>
          {trainingState.error && <Page.Error error={trainingState.error} />}
          {trainingElementsState.error && <Page.Error error={trainingElementsState.error} />}
          {trainingStageState.error && <Page.Error error={trainingStageState.error} />}
          {trainingStagesState.error && <Page.Error error={trainingStagesState.error} />}

          { training &&
            <div className="row m-b-lg m-t-lg">
              <div className="col-md-9">
              <h2>Stages</h2>
              <br/>

              <div id="vertical-timeline" className="vertical-container light-timeline no-margins">
                          <div className="vertical-timeline-block">
                            <div className="vertical-timeline-icon blue-bg">
                              {/* <a href="#top" onClick={this.handleCreateTrainingStage}> */}
                                <i className="fa fa-plus" onClick={this.handleCreateTrainingStage}></i>
                              {/* </a> */}
                            </div>

                            <div className="vertical-timeline-content">
                              <div className="row">
                                <div className="col-xs-8 col-sm-8 col-md-8">
                                  <h2>Create</h2>
                                </div>
                                <div className="col-xs-4 col-sm-4 col-md-4">
                                  <a href="#top" className="btn btn-success" onClick={this.handleCreateTrainingStage}><i className="fa fa-plus"></i> Create</a>
                                </div>
                              </div>
                              {/* <p>Conference on the sales results for the previous year. Monica please examine sales trends in marketing and products. Below please find the current status of the sale.</p> */}
                            </div>
                        </div>

                        { stages && stages.map(stage =>
                          <div className="vertical-timeline-block" key={stage.id}>
                            <div className="vertical-timeline-icon white-bg">
                                <i className="fa fa-rocket"></i>
                            </div>

                            <div className="vertical-timeline-content container container-fluid">
                              <div className="row">
                                <div className="col-xs-11 col-sm-11 col-md-11">
                                  <h2>{ stage.name || 'Stage' }</h2>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1">
                                  <ActionMenu>
                                    <MenuItem eventKey="edit" onClick={this.handleEditTrainingStage.bind(this, stage)}>
                                      <i className="fa fa-pencil"></i>
                                      <span><FormattedMessage {...commonMessages.edit} /></span>
                                    </MenuItem>
                                    <MenuItem eventKey="delete" onClick={this.handleDeleteTrainingStage.bind(this, stage)}>
                                      <i className="fa fa-times"></i>
                                      <span><FormattedMessage {...commonMessages.delete} /></span>
                                    </MenuItem>
                                  </ActionMenu>
                                </div>
                              </div>

                              <span className="vertical-date">
                                { stage.trainingElements &&
                                  <List.CollectionList className="list-inline" itemClassName="badge badge-info" data={mapIDsToObjects(stage.trainingElements, trainingElementsState.content)}/>
                                }
                                <p>Targets - 5: paper - 3, steel plates - 2 </p>
                                <small>Shoots: {stage.shots}</small>
                              </span>
                            </div>
                          </div>
                        )}

                    </div>
              </div>
              <div className="col-md-3">
                <h2>Details</h2>
                <br/>

                <Page.ContainerWrap>
                  <Page.Container>
                    <Page.Header><h5>Training info</h5></Page.Header>
                    <Page.Content>
                      <strong>Organization:</strong> { training.organization ? training.organization.name : '-' }<br/>
                      <strong>Date:</strong> { training.date }<br/>
                      <strong>Time:</strong> { training.time }<br/>
                    </Page.Content>
                  </Page.Container>
                </Page.ContainerWrap>

                <TrainingElementsFrame
                  data={training.trainingElements}
                  trainingElements={trainingElementsState.content}/>

                <TrainingParticipantsList
                  data={training.participants ? training.participants.map(p => p.user) : []}/>
              </div>
            </div>
          }
          </Page>
      </React.Fragment>
    );
  }
}

TrainingPage.propTypes = {
  intl: intlShape.isRequired,
  links: PropTypes.object.isRequired,
  trainingState: PropTypes.object.isRequired,
  trainingElementsOptions: PropTypes.array.isRequired,
  trainingElementsState: PropTypes.object.isRequired,
  trainingStageState: PropTypes.object.isRequired,
  trainingStagesState: PropTypes.object.isRequired,
  fetchTrainingElements: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    links: getLinksSelector(state),
    trainingState: getTrainingSelector(state),
    trainingElementsState: getTrainingElementsSelector(state),
    trainingElementsOptions: getTrainingElementsOptionsSelector(state),
    trainingStageState: getTrainingStageSelector(state),
    trainingStagesState: getTrainingStagesSelector(state)
  };
}

const mapDispatchToProps = {
  fetchTraining,
  fetchTrainingElements,
  fetchTrainingStages,
  showModal
}

export default WithLayout(connect(mapStateToProps, mapDispatchToProps)(injectIntl(TrainingPage)));