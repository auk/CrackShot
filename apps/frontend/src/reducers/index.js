import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { authReducer } from 'reducers/authReducer';
import { configReducer } from 'reducers/configReducer';
import { localeReducer } from 'reducers/localeReducer';
import { reducer as modalReducer } from 'reducers/modalReducer';
import { organizationReducer, organizationsReducer } from 'reducers/organizationReducer';
import { currentUserReducer, usersReducer } from 'reducers/userReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  config: configReducer,
  currentUser: currentUserReducer,
  form: reduxFormReducer,
  locale: localeReducer,
  modal: modalReducer,
  organizations: organizationsReducer,
  organization: organizationReducer,
  toastr: toastrReducer,
  users: usersReducer,
});

export default rootReducer;