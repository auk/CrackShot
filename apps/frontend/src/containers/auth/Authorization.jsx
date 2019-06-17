import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { logout, checkPermission, login } from 'actions/authActions';
import { getAuthSelector, getAdminRolesSelector, getHomeUrlSelector } from 'selectors';

const Authorization = allowedRoles => WrappedComponent => {
  class WithAuthorization extends React.Component {
    static propTypes = {
      auth: PropTypes.shape({
        user_name: PropTypes.string,
        isAdmin: PropTypes.bool,
        permissionChecked: PropTypes.bool,
        roles: PropTypes.array,
        exp: PropTypes.number,
      }).isRequired,
      logout: PropTypes.func.isRequired,
      adminRoles: PropTypes.array.isRequired,
      homeUrl: PropTypes.string.isRequired,
    }

    componentDidMount() {
      const { auth: { roles }, adminRoles, checkPermission } = this.props;
      this.checkAuth();
      checkPermission(roles, adminRoles);
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    checkAuth() {
      const { auth: { user_name, exp }, history, logout } = this.props;

      // If this page is restricted, go to loginPage first.
      // (But pass on this page's path in order to redirect back upon login)
      if (!user_name) {
        history.push(`/login`);
      }

      // If the token has expired
      // exp * 1000 - because exp in seconds, but Date in milliseconds
      if (user_name && exp * 1000 < Date.now()) {
        logout(user_name);
        history.push(`/login`);
      }
    }

    /**
     * Compare user roles with allowed roles for access to component
     * @param {array} userRoles 
     */
    isAllowed() {
      const { auth: { roles }  } = this.props;

      let hasRole = false;
      if (allowedRoles.length === 0) {
        hasRole = true;
      } else {
        for (let i = 0; i < allowedRoles.length; i++) {
          if (roles.includes(allowedRoles[i])) {
            hasRole = true;
            break;
          }
        }
      }

      return hasRole;
    }

    render() {
      const { auth: { permissionChecked }, homeUrl } = this.props;
      //Important to start children's render after permission has checked
      const component = permissionChecked ? (this.isAllowed() ? <WrappedComponent {...this.props} /> : <Redirect to={homeUrl} />) : null;

      return component;
    }
  }

  return withRouter(connect(mapStateToProps, { checkPermission, logout, login })(WithAuthorization));
}

function mapStateToProps(state) {
  return {
    auth: getAuthSelector(state),
    adminRoles: getAdminRolesSelector(state),
    homeUrl: getHomeUrlSelector(state),
  }
}

export default Authorization;