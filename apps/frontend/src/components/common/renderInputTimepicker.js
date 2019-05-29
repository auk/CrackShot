import React from 'react';
import Datetime from 'react-datetime';

import './react-datetime.css';

// import * as FeaturesService from '../../services/FeaturesService';

class renderInputTimepicker extends React.Component {
  constructor(props) {
    super(props);
    this.getValidTimes = this.getValidTimes.bind(this);
  }

  getValidTimes(isAdmin) {
    // var features = this.props.features;
    // console.assert(features);

    const maxHours = 23; // FeaturesService.getMaxHours(features, isAdmin)
    // date is in the future, so allow all times
    return {
      hours: {
        min: 9,
        max: maxHours,
        step: 1,
      },
      minutes: {
        min: 0,
        max: 59,
        step: 15,
      },
    };
  }

  render() {
    const { label, input, placeholder, locale, isAdmin, meta: { touched, error, warning } } = this.props;

    return(
      <div className={`form-group ${touched && error ? 'has-error' : ''} ${touched && warning ? 'has-warning' : ''}`}>
        {
          label && <label className="col-sm-2 control-label">{label}</label>
        }

        <div className={label ? 'col-sm-10' : 'col-sm-12'}>
          <div className="input-group time">
            <Datetime inputProps={{name: input.name, placeholder: placeholder}}
              value={input.value}
              onChange={param => input.onChange(param)}
              locale={ locale }
              dateFormat={ false }
              timeFormat="HH:mm"
              timeConstraints={ this.getValidTimes(isAdmin) }
            />
            <span className="input-group-addon">
              <i className="fa fa-clock-o"></i>
            </span>
          </div>
          <span className={`${touched && error ? 'has-error' : ''} ${touched && warning ? 'has-warning' : ''}`}>
            {touched && ((error && <span className="help-block m-b-none">{error}</span>) || (warning && <span className="help-block m-b-none">{warning}</span>))}
          </span>
        </div>
      </div>
    )
  }
}

export default renderInputTimepicker;
