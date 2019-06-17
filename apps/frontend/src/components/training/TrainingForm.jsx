import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';

import { InputText, InputSelect } from '@startext/react-components';
import renderInputDatepicker from 'components/common/renderInputDatepicker';
import renderInputTimepicker from 'components/common/renderInputTimepicker';
import { defaultMessage } from 'i18n/defineMessages';

import Validate from './validate';

const common = defaultMessage.common;

const handleChange = (selectedOption) => {
  // this.setState({ selectedOption });
  console.log(`Option selected:`, selectedOption);
}
const handleChangeTime = (selectedOption) => {
  // this.setState({ selectedOption });
  console.log(`Time selected:`, selectedOption, ', as string: ', selectedOption.format('HH:mm'));
}

let TrainingForm = React.memo(props => {
  const { handleReset, handleSubmit, locale, resetBtnText, submitBtnText, intl: { formatMessage } } = props;
  const { organizations, users, elements } = props;

  // console.log("* organizations: ", organizations);
  // console.log("* users: ", users);

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <Field name="organization"
            component={InputSelect}
            options={organizations}
            label="Organization"
            placeholder='Organization'
            icon='glyphicon glyphicon-home'
            // required={true}
          />
        </div>
      </div>  
      <div className="row">
        <div className="col-md-12">
        <Field name="date"
              component={renderInputDatepicker}
              onChange={handleChange}
              label="Date"
              // features={features}
              locale={locale}
              // isAdmin={isAdmin}
              required={true}
              />
        </div>
      </div>  
      <div className="row">
        <div className="col-md-12">
        <Field name="time"
              component={renderInputTimepicker}
              onChange={handleChangeTime}
              label="Time"
              // features={features}
              locale={locale}
              // isAdmin={isAdmin}
              // required
            />
        </div>
      </div>  
      <div className="row">
        <div className="col-md-12">
          <Field name="user"
            component={InputSelect}
            onChange={handleChange}
            options={users}
            label="Users"
            placeholder='Users'
            icon='glyphicon glyphicon-user'
            required={true}
            isMulti={true}
            isSearchable={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Field name="element"
            component={InputSelect}
            onChange={handleChange}
            options={elements}
            label="Elements"
            placeholder='Elements'
            icon='glyphicon glyphicon-check'
            // required={true}
            isMulti={true}
            // isSearchable={true}
          />
        </div>
      </div>

      <div className="hr-line-dashed"></div>

      <div className="form-group">
        <div className="col-sm-10">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>{submitBtnText || formatMessage(common.save)}</button>
          <button type="button" className="btn btn-white" onClick={handleReset}>{resetBtnText || formatMessage(common.reset)} </button>
        </div>
      </div>

    </form>
  )
})

TrainingForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  organizations: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  users: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
}

TrainingForm = reduxForm({
  form: 'TrainingForm',
  validate: Validate,
  enableReinitialize: true,
  touchOnBlur: false,
})(TrainingForm);

export default injectIntl(TrainingForm);