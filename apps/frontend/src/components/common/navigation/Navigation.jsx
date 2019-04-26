import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { defaultMessage } from 'i18n/defineMessages';
import UserMenuNav from 'components/common/userMenu/UserMenuNav';

const messages = defaultMessage.navigation;

class Navigation extends Component {
  static propTypes = {
    user_name: PropTypes.string/*.isRequired*/,
    isAdmin: PropTypes.bool.isRequired,
    links: PropTypes.object.isRequired,
    location: PropTypes.object,
  }

  render() {
    const { user_name, isAdmin, links, } = this.props;

    return (
      <nav className="navbar-default navbar-static-side">
        <ul className="nav metismenu" id="side-menu" ref="menu">
          <li className="nav-header _stx-nav-header">
            <a href="/" className="_stx-navbar-brand">stx<b>Toggl</b></a>
            <div className="_stx-nav-header-wrap">
              <UserMenuNav user_name={user_name} isAdmin={isAdmin} />
              <div className="logo-element">ST+</div>
            </div>
          </li>
          <LinkContainer exact to={links.home.url}>
            <NavItem>
              <i className="fa fa-home" aria-hidden="true"></i>{' '}
              <FormattedMessage {...messages.navItem.home} />
            </NavItem>
          </LinkContainer>
          <LinkContainer exact to={links.about.url}>
            <NavItem>
              <i className="fa fa-file-text" aria-hidden="true"></i>{' '}
              <FormattedMessage {...messages.navItem.about} />
            </NavItem>
          </LinkContainer>
        </ul>
      </nav>
    )
  }
}

export default Navigation;