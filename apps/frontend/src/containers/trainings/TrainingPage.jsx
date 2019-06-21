import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import Page from 'components/common/pageTemplate/Page';
import WithLayout from 'containers/layouts/WithLayout';
import { defaultMessage } from 'i18n/defineMessages';
import { getLinksSelector, getTrainingElementSelector, getTrainingElementsSelector } from 'selectors';
import { createTrainingElement, fetchTrainingElements } from 'actions/trainingActions';
import { showModal } from 'actions/modalActions';

const commonMessages = defaultMessage.common;
const navigationMessages = defaultMessage.navigation;
const pageMessages = defaultMessage.pages.trainingElements;

class TrainingPage extends React.Component {
  render() {
    const { trainingElement, trainingElements, links, intl: { formatMessage } } = this.props;
    // const { handleCreateElement, onSizeChange, onSortChange, onPageChange } = this.props;

    const crumbs = [
      {
        url: links.home.url,
        icon: 'fa-home',
        text: commonMessages.breadcrumb.home,
      },
      {
        url: '',
        icon: 'fa-globe',
        text: navigationMessages.navItem.trainingElements,
      },
    ];

    // console.log("Training elements: ", trainingElements);

    return (
      <React.Fragment>
        <Breadcrumbs header={pageMessages.title} crumbs={crumbs} />
        <Page title={formatMessage(pageMessages.title)}>
          {trainingElement.error && <Page.Error error={trainingElement.error} />}
          {trainingElements.error && <Page.Error error={trainingElements.error} />}

          <Page.ContainerRow>
            <Page.Container size="col-md-12">
              <Page.Header>
                <h5>{formatMessage(pageMessages.header)}</h5>
                <Page.Tools>
                  <span className="input-group-btn">
                    <button type="button" className='btn btn-primary btn-xs active' onClick={this.handleCreateElement}>
                      <FormattedMessage {...commonMessages.create} />
                    </button>
                  </span>
                </Page.Tools>
              </Page.Header>
              <Page.Content>
                {/* <TrainingElementsList
                  data={trainingElements}
                  links={links}
                  onClick={this.onElementClick}
                  onDelete={this.handleDeleteElement}
                  onEdit = {this.handleEditElement}
                  onSizeChange={this.onSizeChange}
                  onPageChange={this.onPageChange}
                  onSortChange={this.onSortChange}/> */}
              </Page.Content>
            </Page.Container>
          </Page.ContainerRow>
        </Page>
      </React.Fragment>
    );
  }
}

TrainingPage.propTypes = {
  intl: intlShape.isRequired,
  links: PropTypes.object.isRequired,
  trainingElements: PropTypes.object.isRequired,
  // fetchTrainingElement: PropTypes.func.isRequired,
  fetchTrainingElements: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    links: getLinksSelector(state),
    trainingElement: getTrainingElementSelector(state),
    trainingElements: getTrainingElementsSelector(state),
  };
}

const mapDispatchToProps = {
  createTrainingElement,
  // fetchTrainingElement,
  fetchTrainingElements,
  showModal
}

export default WithLayout(connect(mapStateToProps, mapDispatchToProps)(injectIntl(TrainingPage)));
