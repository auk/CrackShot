//@ril: Temp element, can inplement this functional in InputSelect
import React from 'react';
import PropTypes from 'prop-types';

import MetaText from './helpers/MetaText';

const InputText = (props) => {
  const { input, label, hint, extraClass, placeholder, type, autoFocus, step, required, disabled, icon, meta, prefixButton, postfixButton } = props;

  return (
    <div className={`form-group ${extraClass ? extraClass : ''} ${required ? 'required' : ''} ${meta.touched && meta.error ? 'has-error' : ''} ${meta.touched && meta.warning ? 'has-warning' : ''}`}>
      {label &&
        <label className="col-sm-2 control-label" title={hint}>{label}</label>
      }

      <div className={label ? 'col-sm-10' : 'col-sm-12'}>
        <div className={'input-group'}>
          {prefixButton &&
            <span className="input-group-btn">
              <button type="button" className={`btn ${prefixButton.className}`} disabled={prefixButton.disabled} onClick={prefixButton.onClick}>{prefixButton.text}</button>
            </span>
          }

          <input {...input} className="form-control"
            placeholder={placeholder}
            type={type}
            title={hint}
            step={step}
            autoFocus={autoFocus}
            disabled={disabled} />

          {postfixButton &&
            <span className="input-group-btn">
              <button type="button" className={`btn ${postfixButton.className}`} disabled={postfixButton.disabled} onClick={postfixButton.onClick}>{postfixButton.text}</button>
            </span>
          }
        </div>

        {icon &&
          <span className={icon + " form-control-feedback"} style={{ right: '15px' }} aria-hidden="true"></span>
        }

        <MetaText {...meta} />
      </div>
    </div>
  )
}

InputText.propTypes = {
  label: PropTypes.string,
  hint: PropTypes.string,
  btnText: PropTypes.string,
  btnClass: PropTypes.string,
  extraClass: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  step: PropTypes.number,
}

InputText.defaultProps = {
  type: 'text',
  autoFocus: false,
  required: false,
  disabled: false,
}

export default InputText;
