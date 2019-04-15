import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import StageResultForm from 'components/stage/StageResultForm';
import TestComponent from 'components/testComponent/TestComponent';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.home;
const common = defaultMessage.common;

class HomePage extends React.Component {

  handleResultIncrease = (e, id) => {
    console.log(id);
  }

  handleResultDecrease = (e, id) => {
    console.log(e);
    console.log(id);
  }

  handleResultChange = (e, id, v) => {
    console.log(e);
    console.log(id);
    console.log(v);
  }

  render() {
    const { intl: { formatMessage } } = this.props;
    const crumbs = [
      {
        url: 'fake url',
        icon: 'fa-bank',
        text: common.breadcrumb.home,
      },
      {
        url: 'fake yrl 2',
        icon: 'fa-pencil',
        text: common.breadcrumb.about,
      },
    ];

    return (
      <React.Fragment>
        <Breadcrumbs header={messages.title} crumbs={crumbs} />
        <Page title={formatMessage(messages.title)}>
          <Page.ContainerWrap>
            <Page.Container size="col-md-6">
              <Page.Content>
                <div className="text-center m-t-lg">
                  <FormattedMessage {...messages.welcome}>
                    {text => <h1>{text}</h1>}
                  </FormattedMessage>
                  <FormattedMessage {...messages.about}>
                    {text => <h3>{text}</h3>}
                  </FormattedMessage>
                  <p>
                    <FormattedMessage {...messages.intro} values={{ br: <br /> }} />
                  </p>
                  <br />
                  <br />
                  <Link to="/timer" className="btn btn-outline btn-primary">
                    <FormattedMessage {...messages.start} values={{ arr: <span>&rarr;</span> }} />
                  </Link>
                </div>
              </Page.Content>
            </Page.Container>
            <Page.Container size="col-md-6">
              <Page.Content>
                <StageResultForm 
                  handleResultIncrease={this.handleResultIncrease}
                  handleResultDecrease={this.handleResultDecrease}
                  handleResultChange={this.handleResultChange}
                />
                <div className="hr-line-dashed"></div>
                <TestComponent />
              </Page.Content>
            </Page.Container>
          </Page.ContainerWrap>
        </Page>
      </React.Fragment>
    )
  }
}

HomePage.propTypes = {
  intl: intlShape.isRequired,
}

export default WithLayout(injectIntl(HomePage));