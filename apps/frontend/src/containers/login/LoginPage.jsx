import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import WithLayoutMin from 'containers/layouts/WithLayoutMin';
import { login } from 'actions/authActions';
import { defaultMessage } from 'i18n/defineMessages';
import LoginForm from 'components/login/LoginForm';
import { getLocaleSelector, getAuthSelector } from 'selectors';
import './loginPage.css';

const messages = defaultMessage.loginpage;

class LoginPage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
  };

  componentDidMount() {
    //Redirect to main if already auth
    const { auth: { user_name, exp }, history } = this.props;
    if (user_name && exp && !(exp * 1000 < Date.now())) {
      history.push('/');
    }
  }

  handleAuth = (values) => {
    const { login, history } = this.props;
    login(values, history);
  }

  render() {
    const { intl: { formatMessage }, auth: { error } } = this.props;

    return (
      <DocumentTitle title={formatMessage(messages.title)}>
        <div className="flex-wrapper animated fadeInDown">
          <span className="company-name">startext</span>
          <p className="logo-name">Crack shot</p>
          <div className="middle-box text-center loginscreen">
            <h3><FormattedMessage {...messages.welcome} /></h3>
            <p><FormattedMessage {...messages.description} /></p>

            <LoginForm onSubmit={this.handleAuth} />

            {error &&
              <div className="alert alert-danger">
                {error.message || error.status + (error.statusText ? ': ' + error.statusText : '')}
              </div>
            }
          </div>
        </div>
      </DocumentTitle>
    );
  }
}



function mapStateToProps(state) {
  return {
    auth: getAuthSelector(state),
    locale: getLocaleSelector(state),
  };
}

export default WithLayoutMin(withRouter(connect(mapStateToProps, { login })(injectIntl(LoginPage))));
