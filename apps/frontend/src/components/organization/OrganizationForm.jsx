import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';

import { InputText, InputTextarea } from '@startext/react-components';
// import Validate from './validate';
import { defaultMessage } from 'i18n/defineMessages';

const common = defaultMessage.common;

let OrganizationForm = React.memo(props => {
  const { handleReset, handleSubmit, resetBtnText, submitBtnText, intl: { formatMessage } } = props;

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <Field name="id" component="input" type="hidden" />
      <div className="row">
        <div className="col-md-12">
          <Field name="name"
            component={InputText}
            label="Name"
            placeholder='Organization name'
            icon='glyphicon glyphicon-home'
            required={true}
          />
        </div>
      </div>  
      <div className="row">
        <div className="col-md-12">
          <Field name="address"
            component={InputTextarea}
            label="Address"
            placeholder='Address'
            icon='glyphicon glyphicon-home'
            rows='3'
            required={true}
          />
        </div>
      </div>  
      <div className="row">
        <div className="col-md-12">
          <Field name="web"
            component={InputText}
            label="Web site"
            placeholder='Web site'
            icon='glyphicon glyphicon-globe'
            required={true}
          />
        </div>
      </div>  
      <div className="row">
        <div className="col-md-12">
          <Field name="email"
            component={InputText}
            label="E-mail"
            placeholder='email'
            icon='glyphicon glyphicon-envelope'
            required={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Field name="phone"
            component={InputText}
            label="Phone"
            placeholder='phone'
            icon='glyphicon glyphicon-phone'
            required={true}
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

OrganizationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

OrganizationForm = reduxForm({
  form: 'OrganizationForm',
  // validate: Validate,
  enableReinitialize: true,
  touchOnBlur: false,
})(OrganizationForm);

export default injectIntl(OrganizationForm);