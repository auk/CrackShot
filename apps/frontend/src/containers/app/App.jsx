import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import Authorization from 'containers/auth/Authorization';
import AppConfig from './AppConfig';
import AboutPage from 'containers/about/AboutPage';
import HomePage from 'containers/home/HomePage';
import NotFound from 'containers/notFound/NotFound';
import * as i18n from 'i18n';
import LoginPage from 'containers/login/LoginPage';
import { getRolesSelector, getLinksSelector, getLocaleSelector } from 'selectors';

class App extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    links: PropTypes.object,
    roles: PropTypes.object,
  }

  static defaultProps = {
    locale: 'en',
  }

  constructor(props) {
    super(props);

    this.state = {
      AdminPermission: null,
      UserPermission: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.roles !== this.props.roles) {
      this.setState({
        AdminPermission: Authorization(this.props.roles.admin),
        UserPermission: Authorization(this.props.roles.user),
      });
    }
  }

  render() {
    const { history, locale, links } = this.props;
    const { AdminPermission, UserPermission } = this.state;
    const intlData = {
      locale,
      messages: i18n[locale],
    };

    return (
      <IntlProvider key={locale} {...intlData}>
        <AppConfig>
          {links && AdminPermission && UserPermission &&
            <Router history={history}>
              <Switch>
                <Route exact path={links.home.url} component={HomePage} />
                <Route exact path={links.about.url} component={AboutPage} />
                <Route exact path={links.login.url} component={LoginPage} />
                <Route path='*' component={NotFound} />
              </Switch>
            </Router>
          }
        </AppConfig>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    locale: getLocaleSelector(state),
    links: getLinksSelector(state),
    roles: getRolesSelector(state),
  };
};

export default connect(mapStateToProps)(App);
