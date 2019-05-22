import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { InputText } from '@startext/react-components';
import { defaultMessage } from 'i18n/defineMessages';

const common = defaultMessage.common;

let UserForm = React.memo(props => {
  const { handleReset, handleSubmit, resetBtnText, submitBtnText, intl: { formatMessage } } = props;

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <Field name="texticon"
            component={InputText}
            label="Full name"
            placeholder='Full name'
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

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

UserForm = reduxForm({
  form: 'UserForm',
  // validate: Validate,
  enableReinitialize: true,
  touchOnBlur: false,
})(UserForm);

export default injectIntl(UserForm);