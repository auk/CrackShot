import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import userAuthIcon from 'assets/img/profile.jpg';
import userUnknownIcon from 'assets/img/unknown.svg';
import { defaultMessage } from 'i18n/defineMessages';

const messages = defaultMessage.navigation;

class UserMenuNav extends Component {
  render() {
    const { user_name, isAdmin } = this.props;
    return (
      <div className="profile-element">
        <img alt="user" className="img-circle" src={user_name ? userAuthIcon : userUnknownIcon} height='48' />
        <span className="clear">
          <span className="block m-t-xs _stx-user-name">
            <strong className="font-bold">{user_name ? user_name : <FormattedMessage {...messages.anonymous} />}</strong>
          </span>
          <span className="text-muted text-xs block _stx-user-role">
            {isAdmin ? <FormattedMessage {...messages.admin} /> : <FormattedMessage {...messages.user} />}
          </span>
        </span>
      </div>
    )
  }
}

UserMenuNav.propTypes = {
  intl: intlShape.isRequired,
  user_name: PropTypes.string,
};

export default injectIntl(UserMenuNav);
