import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import Page from 'components/common/pageTemplate/Page';
import WithLayout from 'containers/layouts/WithLayout';
import { defaultMessage } from 'i18n/defineMessages';
import { getLinksSelector, getTrainingSelector, getTrainingElementsSelector, getTrainingElementsOptionsSelector } from 'selectors';
import { fetchTraining, fetchTrainingElements, fetchTrainingStages } from 'actions/trainingActions';
import { showModal } from 'actions/modalActions';
import TrainingParticipantsEditList from 'components/training/TrainingParticipantsEditList'
import TrainingElementsList from 'components/training/TrainingElementsList';
import TrainingParticipantsList from 'components/training/TrainingParticipantsList';

const commonMessages = defaultMessage.common;
const navigationMessages = defaultMessage.navigation;
const pageMessages = defaultMessage.pages.training;

class TrainingPage extends React.Component {

  componentDidMount() {
    const { fetchTraining, fetchTrainingElements, fetchTrainingStages, trainingElementsState: { requestParams }, match: { params } } = this.props;
    fetchTraining(params.tid);
    fetchTrainingElements(requestParams);
    fetchTrainingStages(params.tid, requestParams);
  }

  getTrainingTime(training) {
    if (training) {
      return training.date + (training.time ? ' ' + training.time : '');
    }
    return ''
  }

  handleCreateTrainingStageModal = e => {
    e.preventDefault();

    const { trainingState, trainingElementsOptions } = this.props;

    console.log("Training:", trainingState);
    console.log("Training elements:", trainingElementsOptions);

    const modal = {
      modalType: 'CREATE_TRAINING_STAGE',
      modalProps: {
        resetText: this.props.intl.formatMessage(commonMessages.reset),
        submitText: this.props.intl.formatMessage(commonMessages.create),
        training: trainingState.content,
        trainingElements: trainingElementsOptions,
        initialValues: {
          training: trainingState.content,
          trainingId: trainingState.content.id,
          trainingTitle: this.getTrainingTime(trainingState.content)
          // user: selectedUsersOptions,
        }
      }
    };
    this.props.showModal(modal);
  }

  render() {
    const { trainingState, trainingElementsState, links, intl: { formatMessage } } = this.props;
    // const { handleCreateElement, onSizeChange, onSortChange, onPageChange } = this.props;

    const training = trainingState.content;
    const stages = trainingState.stages.content;
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

          { training && 
            <div className="row m-b-lg m-t-lg">
              <div className="col-md-9">
              <h2>Stages</h2>
              <br/>
              {/* { training && 
                <Page.ContainerRow>
                  <Page.Container size="col-md-12">
                    <Page.Header>
                      <h5>Stages</h5>
                      <Page.Tools>
                        <span className="input-group-btn">
                          <button type="button" className='btn btn-primary btn-xs active' onClick={this.handleCreateElement}>
                            <FormattedMessage {...commonMessages.create} />
                          </button>
                        </span>
                      </Page.Tools>
                    </Page.Header>
                    <Page.Content>
                    </Page.Content> 
                  </Page.Container>
                </Page.ContainerRow>
              } */}

              <div id="vertical-timeline" class="vertical-container light-timeline no-margins">
                          <div className="vertical-timeline-block">
                            <div className="vertical-timeline-icon blue-bg">
                                <i className="fa fa-plus"></i>
                            </div>

                            <div className="vertical-timeline-content">
                              <div className="row">
                                <div className="col-xs-8 col-sm-8 col-md-8">
                                  <h2>Create</h2>
                                </div>
                                <div className="col-xs-4 col-sm-4 col-md-4">
                                  <a href="#" class="btn btn-success" onClick={this.handleCreateTrainingStageModal}><i className="fa fa-plus"></i> Create</a>
                                </div>
                              </div>
                              {/* <p>Conference on the sales results for the previous year. Monica please examine sales trends in marketing and products. Below please find the current status of the sale.</p> */}
                            </div>
                        </div>

                        { stages && stages.map(stage =>
                          <div class="vertical-timeline-block">
                            <div class="vertical-timeline-icon white-bg">
                                <i class="fa fa-rocket"></i>
                            </div>

                            <div class="vertical-timeline-content">
                                <h2>Stage 4</h2>
                                <span className="vertical-date">
                                <p>Targets - 5: paper - 3, steel plates - 2 </p>
                                  <small>Shoots: 24</small>
                                </span>
                            </div>
                          </div>
                        )}

                        {/* <div class="vertical-timeline-block">
                            <div class="vertical-timeline-icon yellow-bg">
                                <i class="fa fa-hand-o-right"></i>
                            </div>

                            <div class="vertical-timeline-content">
                                <h2>Stage 4</h2>
                                <span className="vertical-date">
                                <p>Targets - 5: paper - 3, steel plates - 2 </p>
                                  <small>Shoots: 24</small>
                                </span>
                            </div>
                        </div> */}

                        {/* <div class="vertical-timeline-block">
                            <div class="vertical-timeline-icon gray-bg">
                                <i class="fa fa-wheelchair-alt"></i>
                            </div>

                            <div class="vertical-timeline-content">
                                <h2>Stage 3</h2>
                                <p>Targets - 5: paper - 3, steel plates - 2 </p>
                                <span className="vertical-date">
                                  <small>Shoots: 24</small>
                                </span>
                            </div>
                        </div> */}

                        {/* <div class="vertical-timeline-block">
                            <div class="vertical-timeline-icon white-bg">
                                <i class="fa fa-rocket"></i>
                            </div>

                            <div class="vertical-timeline-content">
                                <h2>Stage 2</h2>
                                <p>Targets - 5: paper - 3, steel plates - 2 </p>
                                <span className="vertical-date">
                                  <small>Shoots: 24</small>
                                </span>
                            </div>
                        </div> */}

                        {/* <div class="vertical-timeline-block">
                            <div class="vertical-timeline-icon white-bg">
                                <i class="fa fa-phone"></i>
                            </div>

                            <div class="vertical-timeline-content">
                                <h2>Stage 1</h2>
                                <p>Targets - 5: paper - 3, steel plates - 2 </p>
                                <span className="vertical-date">
                                  <small>Shoots: 24</small>
                                </span>
                            </div>
                        </div> */}
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

                <TrainingElementsList
                  data={training.trainingElements}
                  trainingElements={trainingElementsState.content}/>

                <TrainingParticipantsList
                  data={training.users}/>  
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
  fetchTrainingElements: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    links: getLinksSelector(state),
    trainingState: getTrainingSelector(state),
    trainingElementsState: getTrainingElementsSelector(state),
    trainingElementsOptions: getTrainingElementsOptionsSelector(state),
  };
}

const mapDispatchToProps = {
  fetchTraining,
  fetchTrainingElements,
  fetchTrainingStages,
  showModal
}

export default WithLayout(connect(mapStateToProps, mapDispatchToProps)(injectIntl(TrainingPage)));