import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { InputText } from '@startext/react-components';
import Validate from './validate';

let OrganizationForm = React.memo(props => {
  const { handleReset, handleSubmit, resetBtnText, submitBtnText } = props;

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
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
          <Field name="site"
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
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>{submitBtnText}</button>
          <button type="button" className="btn btn-white" onClick={handleReset}>{resetBtnText}</button>
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
  validate: Validate,
  enableReinitialize: true,
  touchOnBlur: false,
})(OrganizationForm);

export default OrganizationForm;