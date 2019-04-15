import React from 'react';
import PropTypes from 'prop-types';

import MetaText from './helpers/MetaText';

const InputTextarea = (props) => {
  const { label, input, placeholder, resize, autoFocus, disabled, required, rows, cols, meta } = props;

  return (
    <div className={`form-group ${required ? 'required' : ''} ${meta.touched && meta.error ? 'has-error' : ''} ${meta.touched && meta.warning ? 'has-warning' : ''}`}>
      {label &&
        <label className="col-sm-2 control-label">{label}</label>
      }

      <div className={label ? 'col-sm-10' : 'col-sm-12'}>
        <textarea {...input} placeholder={placeholder} rows={rows} cols={cols} className="form-control" autoFocus={autoFocus} disabled={disabled} style={resize ? {} : {resize: 'none'}} />
        <MetaText {...meta} />
      </div>
    </div>
  )
}

InputTextarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  resize: PropTypes.bool.isRequired,
}

InputTextarea.defaultProps = {
  rows: 5,
  cols: 30,
  autoFocus: false,
  disabled: false,
  required: false,
  resize: true,
}

export default InputTextarea;
