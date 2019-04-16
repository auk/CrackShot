import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import Validate from './validate';
import InputText from '../common/form-elements/InputText';
import SpecialInputText from '../common/form-elements/SpecialInputText';

let StageResultForm = React.memo(props => {
  const { handleSubmit, handleIncrement, handleDecriment, handleTimeChange, initialValues, fields } = props;

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="hr-line-dashed"></div>
      {Object.keys(fields).map(key =>
        <div className="row" key={key}>
          <div className="col-xs-3 col-sm-4">{key}</div>
          <div className="col-xs-6 col-sm-4">
            <Field name={key}
              component={SpecialInputText}
              // onChange={handleChange}
              disabled={true}
              prefixButton={{ text: '-1', onClick: () => handleDecriment(key), className: 'btn-danger' }}
              postfixButton={{ text: '+1', onClick: () => handleIncrement(key), className: 'btn-primary' }}
              placeholder='0'
            // required={true}
            />
          </div>
          <div className="col-xs-3 col-sm-4">
            <Field name={`score_${key}`}
              component={InputText}
              placeholder='0'
              // required={true}
              disabled={true}
            />
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-4">&nbsp;</div>
        <div className="col-xs-2 col-md-1">Shots</div>
        <div className="col-xs-4 col-md-3">
          <Field name="stageShots"
            component={InputText}
            placeholder='0'
            disabled={true}
          />
        </div>
        <div className="col-xs-2 col-md-1">Score</div>
        <div className="col-xs-4 col-md-3">
          <Field name="stageScore"
            component={InputText}
            placeholder='0'
            disabled={true}
          />
        </div>
      </div>
      {/* <div className="hr-line-dashed"></div> */}
      <div className="row">
        <div className="col-md-4">&nbsp;</div>
        <div className="col-xs-2 col-md-1">Time</div>
        <div className="col-xs-4 col-md-3">
          <Field name="stageTime"
            component={InputText}
            placeholder='0'
            onChange={handleTimeChange}
          // required={true}
          />
        </div>
        <div className="col-xs-2 col-md-1">Factor</div>
        <div className="col-xs-4 col-md-3">
          <Field name="stageFactor"
            component={InputText}
            placeholder='0'
            // required={true}
            disabled={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>

    </form>
  );
});

StageResultForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecriment: PropTypes.func.isRequired,
  handleTimeChange: PropTypes.func.isRequired
}

StageResultForm = reduxForm({
  form: 'stageResultForm',
  validate: Validate,
  enableReinitialize: true,
  touchOnBlur: false,
})(StageResultForm);

export default StageResultForm;
