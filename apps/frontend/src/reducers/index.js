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

export function attachNestedReducers(original, reducers) {
  const nestedReducerKeys = Object.keys(reducers)
  return function combination(state, action) {
    const nextState = original(state, action)
    let hasChanged = false
    const nestedState = {}
    for (let i = 0; i < nestedReducerKeys.length; i++) {
      const key = nestedReducerKeys[i]
      const reducer = reducers[key]
      const previousStateForKey = nextState[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      nestedState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? Object.assign({}, nextState, nestedState) : nextState
  }
}

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
  user: attachNestedReducers(userReducer, { trainings: userTrainingsReducer }),
  // user: { trainings:  },
  users: usersReducer,
});

export default rootReducer;