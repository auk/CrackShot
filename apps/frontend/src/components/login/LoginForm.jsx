import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import InputText from 'components/common/form-elements/InputText';
import validate from './LoginValidate';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.loginpage;
const commonMessages = defaultMessage.common;

let LoginForm = (props) => {
  const { error, handleSubmit, pristine, submitting } = props
  const { formatMessage } = props.intl;

  return (
    <form onSubmit={handleSubmit} className="form-horizontal" key="form">
      <Field name="username"
        component={InputText}
        type="text"
        placeholder={formatMessage(messages.usernameHint)}
        autoFocus={true}
        icon="glyphicon glyphicon-user" />
      <Field name="password"
        component={InputText}
        type="password"
        placeholder={formatMessage(messages.passwordHint)}
        icon="glyphicon glyphicon-lock" />

      {error &&
        <div className="alert alert-danger">
          {error}. <br /> <FormattedMessage {...messages.commonHint} />
        </div>
      }

      <button type="submit" className="btn btn-primary block full-width m-b" disabled={pristine || submitting}>
        <FormattedMessage {...commonMessages.login} />
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

LoginForm = reduxForm({
  form: 'loginForm',  // a unique identifier for this form
  validate
})(injectIntl(LoginForm))

export default LoginForm
