import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { defaultMessage } from 'i18n/defineMessages';
import userAuthIcon from 'assets/img/female.svg';
import userUnknownIcon from 'assets/img/unknown.svg';
import LoginButton from 'components/login/LoginButton';

const messages = defaultMessage.navigation;

const UserMenuHeader = props => {
  const { user_name, handleLogout } = props;

  return (
    <Dropdown id="dropdown-user-header" componentClass="li" role="menuitem">
      <Dropdown.Toggle bsStyle={null} className="btn-dis-style" componentClass="a">
        <img src={user_name ? userAuthIcon : userUnknownIcon} className="img-circle" alt="User" height="25" />{' '}
        <span>{user_name ? user_name : <FormattedMessage {...messages.anonymous} />}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className='animated fadeInRight m-t-xs'>
        <LoginButton user_name={user_name} handleLogout={handleLogout} />
      </Dropdown.Menu>
    </Dropdown>
  )
}

UserMenuHeader.propTypes = {
  intl: intlShape.isRequired,
  handleLogout: PropTypes.func.isRequired,
  user_name: PropTypes.string.isRequired,
};

export default injectIntl(UserMenuHeader)
