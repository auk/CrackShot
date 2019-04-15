import React from 'react';
import $ from 'jquery';

const WithLayoutMin = WrappedComponent => {
  class LayoutMin extends React.Component {
    componentDidMount() {
      $("body").removeClass("dark-bg");
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return LayoutMin;
}

export default WithLayoutMin;
