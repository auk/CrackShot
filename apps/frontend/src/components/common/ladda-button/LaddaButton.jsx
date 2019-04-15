import React from 'react';
import PropTypes from 'prop-types';
import * as Ladda from 'ladda';

class LaddaButton extends React.Component {
  static propTypes = {
    btnStyle: PropTypes.string.isRequired,
    dataStyle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    btnStyle: 'btn-primary',
    dataStyle: 'zoom-in',
    type: 'submit',
  }

  constructor(props) {
    super(props);
    this.btnRef = React.createRef();
  }

  componentDidMount() {
    this.btn = Ladda.create(this.btnRef.current);
  }

  componentDidUpdate(prevProps) {
    const { loading } = this.props;
    if (prevProps.loading !== loading) {
      if (loading) {
        this.btn.start();
      } else {
        this.btn.stop();
      }
    }
  }

  render() {
    const { btnStyle, dataStyle, disabled, type } = this.props;

    return (
      <button className={`ladda-button btn ${btnStyle}`}
        ref={this.btnRef}
        data-style={dataStyle}
        disabled={disabled}
        type={type}
      >
        {this.props.children}
      </button>
    )
  }
}

export default LaddaButton;