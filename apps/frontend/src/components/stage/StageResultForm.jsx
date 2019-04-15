import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';

import Validate from './validate';

import InputText from '../common/form-elements/InputText';

const results = [ 'A', 'C', 'D', 'NS', 'Miss', 'Penalty'];

class StageResultForm extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    handleResultIncrease: PropTypes.func.isRequired,
    handleResultDecrease: PropTypes.func.isRequired,
    handleResultChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
//     this.incrementAsync = this.incrementAsync.bind(this);
//     this.incrementIfOdd = this.incrementIfOdd.bind(this);
  }

  inc(e, id) {
    e.preventDefault();
    console.log(e);
    console.log(id);
    // console.log(i);
  }

  render() {
    const { handleResultIncrease, handleResultDecrease, handleResultChange, handleSubmit, isAdmin, locale, pristine, submitting, submitBtnText, resetBtnText, error, reset/*, intl: { formatMessage }*/ } = this.props;

    return (
      <form className="form-horizontal">
        <div class="hr-line-dashed"></div>
        { results.map(i =>
          <div className="row">
            <div className="col-md-4">{i}</div>
            <div className="col-md-1">
              <button className="btn btn-primary" onClick={handleResultDecrease.bind(null, i)}>
              -1
              </button>
            </div>
            <div className="col-md-3">
              <Field name="{i}"
                component={InputText}
                placeholder='0'
                required={true}
                onChange={handleResultChange.bind(i)}
              // disabled={true}
              />
            </div>
            <div className="col-md-1">
              <button type="button" className="btn btn-primary" onClick={this.inc.bind(i)}>
              +1
              </button>
            </div>
            <div className="col-md-3">
              <Field name="A"
                component={InputText}
                placeholder='0'
                required={true}
                disabled={true}
              />
            </div>
          </div>
          )
        }
        <div className="row">
          <div className="col-md-4">
            &nbsp;
          </div>
          <div className="col-md-1">
            Shots
          </div>
          <div className="col-md-3">
            <Field name="text"
              component={InputText}
              placeholder='0'
              disabled={true}
            />
          </div>
          <div className="col-md-1">
            Score
          </div>
          <div className="col-md-3">
            <Field name="text"
              component={InputText}
              placeholder='0'
              disabled={true}
            />
          </div>
        </div>
        <div className="hr-line-dashed"></div>
        <div className="row">
          <div className="col-md-4">
            &nbsp;
          </div>
          <div className="col-md-1">
            Time
          </div>
          <div className="col-md-3">
            <Field name="time"
              component={InputText}
              placeholder='0'
              required={true}
            />
          </div>
          <div className="col-md-1">
            Factor
          </div>
          <div className="col-md-3">
            <Field name="factor"
              component={InputText}
              placeholder='0'
              required={true}
              disabled={true}
            />
          </div>
        </div>

      </form>
    );
  }
}

StageResultForm = reduxForm({
  form: 'stageResultForm',
  validate: Validate,
  enableReinitialize: true,
  touchOnBlur: false,
})(StageResultForm);

export default StageResultForm;
