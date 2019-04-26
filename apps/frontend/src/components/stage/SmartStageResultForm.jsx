import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import StageResultForm from 'components/stage/StageResultForm';
import { Enums, StageResults } from '@startext/ipsc';

const FieldNames = {
  A: 'A',
  C: 'C',
  D: 'D',
  MISS: 'Miss',
  NS: 'No shoot',
  PENALTY: 'Penalty'
};

// class HomePage extends React.Component {

class SmartStageResultForm extends React.Component {

  static propTypes = {
    powerFactor: PropTypes.symbol.isRequired
  }

  constructor(props) {
    super(props);

    this.initialState = {
      results: this.getResultsKeys().reduce((acc, val) => { acc[val] = 0; return acc; }, {}),
      stageScores: {},
      stageScore: 0,
      stageShots: 0,
      stageTime: undefined,
      stageFactor: 0
    };

    this.state = {
      ...this.initialState,
      powerFactor: props.powerFactor
    }
  }

  getResultsKeys() {
    return Object.keys(Enums.Results);
  }

  createStageResults(rawResults) {
    let results = new StageResults();
    this.getResultsKeys().reduce((acc, val) => results.addResult(Enums.Result.of(val), rawResults[val]), null);
    return results;
  }

  handleClean = data => {
    this.setState(prevState => ({
      ...prevState,
      ...this.initialState
    }));
  };

  handleTimeChange = data => {
    // console.log('Time', data.target.value);
    var number = 0;
    if (data.target.value)
      number = Number.parseFloat(data.target.value.replace(',', '.'));

    if (isNaN(number))
      number = 0;

    this.setState(prevState => ({
      ...prevState,
      stageTime: number
    }), this.calculateFactor);
  };

  increment = id => {
    // console.log('increment', id);
    const newValue = this.state.results[id] + 1
    const newResults = { ...this.state.results, ...{ [id]: newValue }};
    this.calculateResults(newResults);
  };

  decrement = id => {
    // console.log('decrement', id);
    const newValue = Math.max(this.state.results[id] - 1, 0)
    const newResults = { ...this.state.results, ...{ [id]: newValue }};
    this.calculateResults(newResults);
  };

  calculateResults = (results) => {
    console.assert(results);

    const objResults = this.createStageResults(results)
    const stageScores = this.getResultsKeys().reduce((acc, i) => {
      acc[i] = objResults.calculateScore(this.state.powerFactor, Enums.Result.of(i));
      return acc;
    }, {});
    const totalShots = Object.keys(results).filter(k => k !== 'PENALTY').reduce((acc, val) => acc + results[val], 0);

    this.setState(prevState => ({
      results: { ...results },
      stageScores: { ...stageScores },
      stageScore: objResults.calculateScores(this.state.powerFactor),
      stageShots: totalShots,
      hitFactor: objResults.calculateHitFactor(this.state.powerFactor, this.state.stageTime)
    }), this.calculateFactor);
  };

  calculateFactor = () => {
    const objResults = this.createStageResults(this.state.results)
    this.setState(prevState => ({
      ...prevState,
      stageFactor: objResults.calculateHitFactor(this.state.powerFactor, this.state.stageTime)
    }));
  };

  prepareScoreResultFields = (results) => {
    return this.getResultsKeys().reduce((acc, i) => {
      acc['score_' + i] = results && results[i] ? results[i] : 0;
      return acc;
    }, {});
  };

  render() {
    const { handleSubmit } = this.props;

    const resultFormData = {
      ...this.state.results,
      ...this.prepareScoreResultFields(this.state.stageScores),
      stageScore: this.state.stageScore,
      stageShots: this.state.stageShots,
      stageTime: this.state.stageTime,
      stageFactor: this.state.stageFactor,
    }

    return (
      <StageResultForm
        fields={FieldNames}
        initialValues={resultFormData}
        handleClean={this.handleClean}
        handleIncrement={this.increment}
        handleDecriment={this.decrement}
        handleTimeChange={this.handleTimeChange}
        onSubmit={handleSubmit}
  />
    );
    }
};

SmartStageResultForm = reduxForm({
  form: 'SmartStageResultForm',
  // validate: Validate,
  enableReinitialize: true,
  touchOnBlur: false,
})(SmartStageResultForm);

export default SmartStageResultForm;
// export default connect(mapStateToProps, mapDispatchToProps)(DashboardChart);
