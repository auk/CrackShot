import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Validate from './vaildate';
import TextArea from '../common/form-elements/InputTextarea';
import InputSelect from '../common/form-elements/InputSelect';
import InputText from '../common/form-elements/InputText';
import InputCheckbox from '../common/form-elements/InputCheckbox';

class TestComponent extends Component {
  render() {
    const opt = [
      { value: 'cat', label: 'Cat' },
      { value: 'dog', label: 'Dog' },
      { value: 'turtle', label: 'Turtle' },
      { value: 'horse', label: 'Horse' },
      { value: 'chicken', label: 'Chicken' },
      { value: 'monkey', label: 'Monkey' },
    ]
    return (
      <form className="form-horizontal">
        <div className="row">
          <div className="col-md-12">
            <Field name="textarea"
              component={TextArea}
              resize={false}
              label='asgqawg'
            />
          </div></div>
        <div className="row">
          <div className="col-md-12">
            <Field name="select"
              component={InputSelect}
              options={opt}
              label='asgqawg'
              clearable={false}
              required={true}
              placeholder='hfhjfaew'
            // disabled={true}
            />

          </div></div>
        <div className="row">
          <div className="col-md-12">
            <Field name="texticon"
              component={InputText}
              label="fafss"
              placeholder='texticon'
              icon='glyphicon glyphicon-user'
              required={true}
            />

          </div></div>
        <div className="row">
          <div className="col-md-12">
            <Field name="text"
              component={InputText}
              placeholder='inputtext'
              required={true}
              label='asgqawg'
            // disabled={true}
            />

          </div></div>
        <div className="row">
          <div className="col-md-12">
            <Field name="textgroup"
              component={InputText}
              placeholder='inputgroup'
              label="gr4eg"
              required={true}
              type='number'
              btnText='Submit'
              btnClass='btn-primary'
            // disabled={true}
            />

          </div></div>
        <div className="row">
          <div className="col-md-12">
            <Field name="checkbox"
              label="gr4eg"
              component={InputCheckbox}
              checkboxClass="icheckbox_square-green"
            />

          </div></div>
      </form>
    );
  }
}

TestComponent = reduxForm({
  form: 'testForm',
  validate: Validate,
})(TestComponent);

export default TestComponent;
