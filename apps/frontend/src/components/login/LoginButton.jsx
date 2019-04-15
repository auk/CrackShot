import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { defaultMessage } from 'i18n/defineMessages';

const common = defaultMessage.common;

const LoginButton = (props) => {
  let authBtn;
  if (props.user_name) {
    authBtn = <button className="btn btn-default" style={{width: '100%'}} onClick={props.handleLogout}>
      <i className="fa fa-sign-out header_fa" /> {' '}
      <FormattedMessage {...common.logout} />
    </button>
  } else {
    authBtn = <Link to="/login">
      <i className="fa fa-sign-in" /> {' '}
      <FormattedMessage {...common.login} />
    </Link>
  }
  return (
    <li>
      {authBtn}
    </li>
  )
}

LoginButton.propTypes = {
  intl: intlShape.isRequired,
  user_name: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default injectIntl(LoginButton)
