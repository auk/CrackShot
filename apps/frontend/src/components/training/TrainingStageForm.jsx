import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import { InputText, InputSelect, InputCheckbox } from '@startext/react-components';
import { defaultMessage } from 'i18n/defineMessages';

import Validate from './validate';

const common = defaultMessage.common;

let TrainingStageForm = React.memo(props => {
  const { handleReset, handleSubmit, locale, resetBtnText, submitBtnText, intl: { formatMessage } } = props;
  const { training, trainingElements } = props;
  
  const handleChange = (selectedOption) => {
    // this.setState({ selectedOption });
    console.log('Option selected:', selectedOption);
    console.log('Users:', props.user);
  }
  const handleChangeTime = (selectedOption) => {
    // this.setState({ selectedOption });
    console.log(`Time selected:`, selectedOption, ', as string: ', selectedOption.format('HH:mm'));
  }
  
  // console.log("* organizations: ", organizations);
  // console.log("* users: ", users);

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="row">
          <div className="col-md-12">
            { training &&
              <Field name="trainingId" component="input" type="hidden" />
            }
            { training &&
              <Field name="trainingTitle"
                component={InputText}
                label="Training"
                icon='glyphicon glyphicon-home'
                disabled={true}
                />
            }
            <Field name="element"
              component={InputSelect}
              // onChange={handleChange}
              options={trainingElements}
              label="Elements"
              placeholder='Elements'
              icon='glyphicon glyphicon-check'
              // required={true}
              isMulti={true}
              // isSearchable={true}
            />
            <Field name="shots"
              component={InputText}
              // onChange={handleChange}
              label="Shots"
              placeholder='25'
              // icon='glyphicon glyphicon-check'
              type='number'
              min='0'
            />
          </div>
        </div>
      </div>

      <div className="hr-line-dashed"></div>

      <div className="form-group">
        <div className="col-sm-10">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>{submitBtnText || formatMessage(common.save)}</button>
          <button type="button" className="btn btn-white" onClick={handleReset}>{resetBtnText || formatMessage(common.reset)} </button>
        </div>
      </div>

    </form>
  )
})

TrainingStageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  training: PropTypes.object,
  trainingElements: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  // users: PropTypes.arrayOf(PropTypes.shape({
  //   label: PropTypes.string.isRequired,
  //   value: PropTypes.string.isRequired,
  // })),
}

const formSelector = formValueSelector('TrainingStageForm')

const mapStateToProps = state => ({
  // participate: formSelector(state, 'participate'),
});

TrainingStageForm = reduxForm({
  form: 'TrainingStageForm',
  validate: Validate,
  enableReinitialize: true,
  touchOnBlur: false,
})(TrainingStageForm);

export default connect(mapStateToProps)(injectIntl(TrainingStageForm));