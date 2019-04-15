import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import MetaText from './helpers/MetaText';

const colourStyles = {
  control: (base, state) => {
    const color = state.isFocused ? '#1ab394' : '#e5e6e7';
    return {
      ...base,
      backgroundColor: 'white',
      borderRadius: 0,
      boxShadow: "0 !important",
      borderColor: color,
      '&:hover': {
        borderColor: color,
      },
    };
  },
  menu: base => ({ ...base, zIndex: 99, }),
};

const InputSelect = props => {
  const { label, input, options, isClearable, isDisabled, placeholder, isMulti, meta, required, isSearchable, menuPlacement, autoFocus } = props;

  return (
    <div className={`form-group ${required ? 'required' : ''} ${meta.touched && meta.error ? 'has-error' : ''} ${meta.touched && meta.warning ? 'has-warning' : ''}`}>
      {label &&
        <label className="col-sm-2 control-label">{label}</label>
      }

      <div className={label ? 'col-sm-10' : 'col-sm-12'}>
        <Select {...input}
          styles={colourStyles}
          options={options}
          onChange={input.onChange}
          value={input.value ? input.value : ''}
          onBlur={event => event.preventDefault()}
          autoFocus={autoFocus}
          placeholder={placeholder}
          menuPlacement={menuPlacement}
          required={required}
          isClearable={isClearable}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isDisabled={isDisabled}
        />
        <MetaText {...meta} />
      </div>
    </div>
  )

}

InputSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  menuPlacement: PropTypes.oneOf(['auto', 'top']),
  required: PropTypes.bool.isRequired,
  isClearable: PropTypes.bool.isRequired,
  isMulti: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isSearchable: PropTypes.bool.isRequired,
}

InputSelect.defaultProps = {
  menuPlacement: 'auto',
  required: false,
  isClearable: true,
  isMulti: false,
  isDisabled: false,
  isSearchable: false,
}

export default InputSelect;
