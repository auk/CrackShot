import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { InputText } from '@startext/react-components';

let UserForm = React.memo(props => {
  const { handleSubmit } = props;

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <Field name="texticon"
            component={InputText}
            label="Name"
            placeholder='organization name'
            icon='glyphicon glyphicon-home'
            required={true}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <Field name="texticon"
            component={InputText}
            label="Login"
            placeholder='login'
            icon='glyphicon glyphicon-user'
            required={true}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <Field name="texticon"
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
          <Field name="texticon"
            component={InputText}
            label="Phone"
            placeholder='phone'
            icon='glyphicon glyphicon-phone'
            required={true}
          />
        </div>
      </div>
    </form>
  )
})

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

UserForm = reduxForm({
  form: 'UserForm',
  // validate: Validate,
  enableReinitialize: true,
  touchOnBlur: false,
})(UserForm);

export default UserForm;