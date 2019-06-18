import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { InputText } from '@startext/react-components';
import { defaultMessage } from 'i18n/defineMessages';

const commonMessages = defaultMessage.common;

let TrainingElementForm = React.memo(props => {
  const { handleReset, handleSubmit, locale, resetBtnText, submitBtnText, intl: { formatMessage } } = props;
  const { element } = props;

  console.log("TrainingElementForm - element:", element);

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <Field name="id" component="input" type="hidden" />
          <Field name="name"
            component={InputText}
            // options={organizations}
            label={formatMessage(commonMessages.name)}
            placeholder={formatMessage(commonMessages.name)}
            icon='glyphicon glyphicon-edit'
            autoFocus={true}
            required={true}
          />
        </div>
      </div>

      <div className="hr-line-dashed"></div>

      <div className="form-group">
        <div className="col-sm-10">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>{submitBtnText || formatMessage(commonMessages.save)}</button>
          <button type="button" className="btn btn-white" onClick={handleReset}>{resetBtnText || formatMessage(commonMessages.reset)} </button>
        </div>
      </div>

    </form>
  );
});

TrainingElementForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

TrainingElementForm = reduxForm({
  form: 'TrainingElementForm',
  // validate: Validate,
  enableReinitialize: true,
  touchOnBlur: false,
})(TrainingElementForm);

export default injectIntl(TrainingElementForm);