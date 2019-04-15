import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import LangSwitcher from 'components/common/langSwitcher/langSwitcher';
import UserMenuHeader from 'components/common/userMenu/UserMenuHeader';
import { smoothlyMenu } from 'containers/layouts/Helpers';

class Header extends Component {
  static propTypes = {
    user_name: PropTypes.string,
    isAdmin: PropTypes.bool,
    handleLogout: PropTypes.func.isRequired,
  }

  toggleNavigation(e) {
    e.preventDefault();

    $("body").toggleClass("mini-navbar");
    if ($("body").hasClass('mini-navbar')) {
      $('li.header').addClass('mini');
      $('button.toggle-btn').addClass('mini');
    } else {
      $('li.header').removeClass('mini');
      $('button.toggle-btn').removeClass('mini');
    }
    smoothlyMenu();
  }

  render() {
    const { user_name, isAdmin, handleLogout } = this.props;

    return (
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top _stx-navbar-static-top" style={{ marginBottom: 0 }}>
          <div className="navbar-header">
            <button className="navbar-minimalize minimalize-styl-2 btn btn-primary " onClick={this.toggleNavigation}><i className="fa fa-bars"></i> </button>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <LangSwitcher />
            <UserMenuHeader user_name={user_name} isAdmin={isAdmin} handleLogout={handleLogout} />
          </ul>
        </nav>
      </div>
    )
  }
}

export default Header;