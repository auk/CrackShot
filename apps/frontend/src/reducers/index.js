import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { configReducer } from 'reducers/configReducer';
import { localeReducer } from 'reducers/localeReducer';
import { authReducer } from 'reducers/authReducer';
import { reducer as organizationsReducer } from 'reducers/organizationReducer';

const rootReducer = combineReducers({
  config: configReducer,
  locale: localeReducer,
  form: reduxFormReducer,
  auth: authReducer,
  organizations: organizationsReducer
});

export default rootReducer;