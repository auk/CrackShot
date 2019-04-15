import React from 'react';
import PropTypes from 'prop-types';

const MetaText = (props) => {
  const { touched, error, warning } = props;

  return (
    <span className={`${touched && error ? 'has-error' : ''} ${touched && warning ? 'has-warning' : ''}`}>
      {touched && ((error && <span className="help-block m-b-none">{error}</span>) || (warning && <span className="help-block m-b-none">{warning}</span>))}
    </span>
  )
}

MetaText.propTypes = {
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  warning: PropTypes.string,
}

export default MetaText;