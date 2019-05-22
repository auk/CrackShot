import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';

import { InputText, InputSelect } from '@startext/react-components';
import renderInputDatepicker from 'components/common/renderInputDatepicker';
import { defaultMessage } from 'i18n/defineMessages';

import Validate from './validate';

const common = defaultMessage.common;

const handleChange = (selectedOption) => {
  // this.setState({ selectedOption });
  console.log(`Option selected:`, selectedOption);
}

let TrainingForm = React.memo(props => {
  const { handleReset, handleSubmit, locale, resetBtnText, submitBtnText, organizationsOptions, intl: { formatMessage } } = props;
  const { users, usersOptions } = props;

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <Field name="organization"
            component={InputSelect}
            options={organizationsOptions}
            label="Organization"
            placeholder='Organization'
            icon='glyphicon glyphicon-home'
            required={true}
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
              required
            />
        </div>
      </div>  
      <div className="row">
        <div className="col-md-12">
          <Field name="users"
            component={InputSelect}
            onChange={handleChange}
            options={usersOptions}
            label="Users"
            placeholder='Users'
            icon='glyphicon glyphicon-user'
            required={true}
            isMulti={true}
            isSearchable={true}
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
  organizationsOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  usersOptions: PropTypes.arrayOf(PropTypes.shape({
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