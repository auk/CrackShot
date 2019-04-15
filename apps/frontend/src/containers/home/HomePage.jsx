import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import WithLayout from 'containers/layouts/WithLayout';
import Page from 'components/common/pageTemplate/Page';
import StageResultForm from 'components/stage/StageResultForm';
import Breadcrumbs from 'components/common/breadcrumbs/Breadcrumbs';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.home;
const common = defaultMessage.common;

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initValues: {
        A: 2,
        C: 0,
        D: 0,
        NS: 3,
        Miss: 0,
        Penalty: 1,
      }
    }
  }

  handleSubmit = data => {
    console.log('handleSubmit', data);
  }

  increment = id => {
    console.log('increment', id);
    this.setState(prevState => ({
      initValues: { ...prevState.initValues, [id]: prevState.initValues[id] + 1 }
    }));
  }

  decrement = id => {
    console.log('decrement', id);
    this.setState(prevState => ({
      initValues: { ...prevState.initValues, [id]: prevState.initValues[id] - 1 }
    }));
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
                  initialValues={this.state.initValues}
                  onSubmit={this.handleSubmit}
                  handleIncrement={this.increment}
                  handleDecriment={this.decrement}
                />
                <div className="hr-line-dashed"></div>
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