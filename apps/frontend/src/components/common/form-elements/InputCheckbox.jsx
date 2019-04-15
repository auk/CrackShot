import React from 'react';
import PropTypes from 'prop-types';
import 'icheck/skins/all.css';
import { Checkbox } from 'react-icheck';

const InputCheckbox = (props) => {
  const { input, label, checkboxClass, } = props;

  return (
    <div className="input-group">
      <Checkbox
      cursor={null}
        {...input}
        checkboxClass={checkboxClass}
        increaseArea="20%"
        label={label}
      />
    </div>
  )
}

InputCheckbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  checkboxClass: PropTypes.string.isRequired,
}

InputCheckbox.defaultProps = {
  checkboxClass: 'icheckbox_square-green',
}

export default InputCheckbox;