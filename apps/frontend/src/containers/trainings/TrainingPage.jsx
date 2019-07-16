import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import Page from 'components/common/pageTemplate/Page';
import WithLayout from 'containers/layouts/WithLayout';
import { defaultMessage } from 'i18n/defineMessages';
import { getLinksSelector, getTrainingSelector, getTrainingElementsSelector } from 'selectors';
import { fetchTraining, fetchTrainingElements } from 'actions/trainingActions';
import { showModal } from 'actions/modalActions';
import TrainingParticipantsEditList from 'components/training/TrainingParticipantsEditList'
import TrainingElementsList from 'components/training/TrainingElementsList';
import TrainingParticipantsList from 'components/training/TrainingParticipantsList';

const commonMessages = defaultMessage.common;
const navigationMessages = defaultMessage.navigation;
const pageMessages = defaultMessage.pages.training;

class TrainingPage extends React.Component {

  componentDidMount() {
    const { fetchTraining, fetchTrainingElements, trainingElements: { requestParams }, match: { params } } = this.props;
    fetchTraining(params.tid);
    fetchTrainingElements(requestParams);
  }

  getTrainingTime(training) {
    if (training) {
      return training.date + (training.time ? ' ' + training.time : '');
    }
    return ''
  }

  render() {
    const { trainingState, trainingElements, links, intl: { formatMessage } } = this.props;
    // const { handleCreateElement, onSizeChange, onSortChange, onPageChange } = this.props;

    const training = trainingState.content;
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
          {trainingElements.error && <Page.Error error={trainingElements.error} />}

          { training && 
            <div className="row m-b-lg m-t-lg">
              <div className="col-md-9">
              { training && 
                <Page.ContainerRow>
                  <Page.Container size="col-md-12">
                    <Page.Header>
                      <h5>{formatMessage(commonMessages.participants)}</h5>
                      <Page.Tools>
                        <span className="input-group-btn">
                          <button type="button" className='btn btn-primary btn-xs active' onClick={this.handleCreateElement}>
                            <FormattedMessage {...commonMessages.create} />
                          </button>
                        </span>
                      </Page.Tools>
                    </Page.Header>
                    <Page.Content>
                      <TrainingParticipantsEditList
                        data={trainingElements}
                        links={links}
                        onClick={this.onElementClick}
                        onDelete={this.handleDeleteElement}
                        onEdit = {this.handleEditElement}
                        onSizeChange={this.onSizeChange}
                        onPageChange={this.onPageChange}
                        onSortChange={this.onSortChange}/>
                    </Page.Content>
                  </Page.Container>
                </Page.ContainerRow>
              }
              </div>
              <div className="col-md-3">
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
                  trainingElements={trainingElements.content}/>

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
  training: PropTypes.object.isRequired,
  trainingElements: PropTypes.object.isRequired,
  fetchTrainingElements: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    links: getLinksSelector(state),
    trainingState: getTrainingSelector(state),
    trainingElements: getTrainingElementsSelector(state),
  };
}

const mapDispatchToProps = {
  fetchTraining,
  // fetchTrainingElement,
  fetchTrainingElements,
  showModal
}

export default WithLayout(connect(mapStateToProps, mapDispatchToProps)(injectIntl(TrainingPage)));
