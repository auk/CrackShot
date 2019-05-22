import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';

import './react-datetime.css';

class renderInputDatepicker extends React.Component {
  constructor(props) {
      super(props);
      this.getValidDates = this.getValidDates.bind(this);
  }

  getValidDates(currentDate) {
      // var features = this.props.features;
      // console.assert(features);
      // var limits = features.timeentry.dateLimitation;
      // console.assert(limits);

      // if (!limits || !limits.enabled)
      //   return true;

      var days = 30; // limits.days;
      var beforeDate = moment().subtract(days, 'day');
      return currentDate.isBetween(beforeDate, moment());
  }

  render() {
    const { label, input, placeholder, locale, isAdmin, meta: { touched, error, warning } } = this.props;

    return (
      <div className={`form-group ${touched && error ? 'has-error' : ''} ${touched && warning ? 'has-warning' : ''}`}>
        { label && <label className="col-sm-2 control-label">{label}</label> }

        <div className={label ? "col-sm-10" : "col-sm-12"}>
          <div className="input-group date">
            <Datetime inputProps={{name: input.name, placeholder: placeholder}}
              value={input.value}
              onChange={param => input.onChange(param)}
              locale={ locale }
              isValidDate={ isAdmin ? undefined : this.getValidDates }
              timeFormat={ false }
              dateFormat={"DD/MM/YYYY"}
            />
            <span className="input-group-addon">
              <i className="fa fa-calendar"></i>
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

export default renderInputDatepicker;