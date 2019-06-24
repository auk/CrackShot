import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { authReducer } from 'reducers/authReducer';
import { configReducer } from 'reducers/configReducer';
import { localeReducer } from 'reducers/localeReducer';
import { reducer as modalReducer } from 'reducers/modalReducer';
import { organizationReducer, organizationsReducer } from 'reducers/organizationReducer';
import { trainingReducer, trainingsReducer } from 'reducers/trainingReducers';
import { trainingElementReducer, trainingElementsReducer } from 'reducers/trainingReducers';
import { currentUserReducer, userReducer, userTrainingsReducer, usersReducer } from 'reducers/userReducers';

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
  training: trainingReducer,
  trainings: trainingsReducer,
  trainingElement: trainingElementReducer,
  trainingElements: trainingElementsReducer,
  user: userReducer,
  userTrainings: userTrainingsReducer,
  users: usersReducer,
});

export default rootReducer;