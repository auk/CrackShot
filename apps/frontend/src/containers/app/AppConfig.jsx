import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchConfig } from 'actions/configActions';

class AppConfig extends Component {
  static propTypes = {
    isConfigLoaded: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.fetchConfig();
  }

  render() {
    return this.props.isConfigLoaded ? this.props.children : (<p>Config not loaded.</p>);
  }
}

function mapStateToProps(state) {
  return {
    isConfigLoaded: state.config.isConfigLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchConfig: bindActionCreators(fetchConfig, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppConfig);