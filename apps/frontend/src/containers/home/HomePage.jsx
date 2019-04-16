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
      results: {
        A: 0,
        C: 0,
        D: 0,
        NS: 0,
        MISS: 0,
        PENALTY: 0,
      },
      rates: {
        A: 5,
        C: 3,
        D: 1,
        NS: -10,
        MISS: -10,
        PENALTY: -10
      },
      stageScores: {},
      stageScore: 0,
      stageShots: 0
    }
  }

  handleSubmit = data => {
    console.log('handleSubmit', data);
  }

  handleChange = data => {
    // data.target.value = Math.max(data.target.value, 0);
    const newResults = { ...this.state.results, ...{ [data.target.name]: data.target.value }};
    this.assignResults(newResults);
  }

  increment = id => {
    console.log('increment', id);
    const newValue = this.state.results[id] + 1
    const newResults = { ...this.state.results, ...{ [id]: newValue }};
    this.assignResults(newResults);
  }

  decrement = id => {
    console.log('decrement', id);
    const newValue = Math.max(this.state.results[id] - 1, 0)
    const newResults = { ...this.state.results, ...{ [id]: newValue }};
    this.assignResults(newResults);
  }

  assignResults = (results) => {
    console.assert(results);

    const scores = this.buildScores(results, this.state.rates);
    const score = Math.max(Object.values(scores).reduce((acc, val) => acc + val, 0), 0);
    const shots = Object.keys(results).filter(k => k !== 'PENALTY').reduce((acc, val) => acc + results[val], 0);
    this.setState(prevState => ({
      results: { ...results },
      stageScores: { ...prevState.stageScores, ...scores },
      stageScore: score,
      stageShots: shots
    }));
    console.log('shots:', shots);
    
  }

  buildScores = (results, rates) => {
    return Object.keys(results).reduce((map, id) => {
      map[id] = rates[id] ? results[id] * rates[id] : 0;
      return map;
    }, {});
  }

  prepareScoreValues = (values) => {
    console.assert(values);
    return Object.keys(values).reduce((acc, i) => {
      acc['score_' + i] = values[i];
      return acc;
    }, {});
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

    var resultFormData = {
      ...this.state.results,
      ...this.prepareScoreValues(this.state.stageScores),
      stageScore: this.state.stageScore,
      stageShots: this.state.stageShots
    };

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
                  fields={this.state.results}
                  initialValues={resultFormData}
                  onSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
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
