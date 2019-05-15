import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

import { correctHeight, detectBody } from './Helpers';
import Navigation from 'components/common/navigation/Navigation';
import Progress from 'components/common/progress/Progress';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import ModalRoot from 'components/modal/ModalRoot';
import { fetchCurrentUser } from 'actions/userActions';
import { logout } from 'actions/authActions';
import * as selectors from 'selectors';

const WithLayout = WrappedComponent => {
  class Layout extends React.Component {
    static propTypes = {
      auth: PropTypes.shape({
        user_name: PropTypes.string,
        isAdmin: PropTypes.bool,
      }).isRequired,
      location: PropTypes.object.isRequired,
      links: PropTypes.object.isRequired,
      fetchCurrentUser: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      version: PropTypes.any,
    }

    static contextTypes = {
      router: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props);

      this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
      const { auth: { user_name }, history, logout } = this.props;
      logout(user_name);
      history.push(`/login`);
    }

    componentDidMount() {
      const { /*auth: { user_name, isAdmin },*/ fetchCurrentUser } = this.props;

      $("body").addClass("dark-bg");
      correctHeight();
      detectBody();

      // Run correctHeight function on load and resize window event
      $(window).bind("load resize", function () {
        correctHeight();
        detectBody();
      });

      // Correct height of wrapper after metisMenu animation.
      $('.metismenu a').click(() => {
        setTimeout(() => {
          correctHeight();
        }, 300)
      });

      fetchCurrentUser();
    }

    render() {
      const { auth: { user_name, isAdmin }, links, version, } = this.props;

      return (
        <div id="wrapper">
          <Progress />
          <ModalRoot />
          <Navigation links={links} 
            user_name={user_name} 
            isAdmin={isAdmin} 
          />
          <div id="page-wrapper" className="gray-bg actapro">
            <Header location={this.props.location}
              user_name={user_name}
              handleLogout={this.handleLogout}
            />
            <WrappedComponent {...this.props} />
            <Footer version={version} />
          </div>
        </div>
      )
    }
  }

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
}

const mapStateToProps = (state) => {
  const { config } = state;
  return {
    auth: selectors.getAuthSelector(state),
    currentUser: selectors.getCurrentUserSelector(state),
    links: selectors.getLinksSelector(state),
    version: config && config.webapp.version ? config.webapp.version : '1.0.0',
  };
};

const mapDispatchToProps = {
  logout,
  fetchCurrentUser,
}

export default WithLayout;