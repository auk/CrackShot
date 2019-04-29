import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { InputText } from '@startext/react-components';

let OrganizationForm = React.memo(props => {
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

export default OrganizationForm;