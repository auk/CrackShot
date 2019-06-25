import { loadUserProfile, loadLocale, getBrowserLocale, loadCurrentUser } from 'utils/utils';
import { authorityToRole } from 'selectors';

const initialState = {
  auth: {
    user_name: null,
    roles: [],
    exp: null,
    isAdmin: false,
    loggingIn: false,
    loggingOut: false,
    permissionChecked: false,
  },
  locale: getBrowserLocale(),
  currentUser: {
    content: {},
  }
};

const initAuth = () => {
  const userProfile = loadUserProfile();
  return {
    ...initialState.auth,
    user_name: userProfile ? userProfile.user_name : null,
    roles: userProfile ? userProfile.authorities.map(authorityToRole) : null,
    exp: userProfile ? userProfile.exp : null,
  }
}

function initializeLocale() {
  const locale = loadLocale();
  return locale ? locale : initialState.locale;
}

function initialCurrentUser() {
  const currentUser = loadCurrentUser();
  return currentUser ? currentUser : initialState.currentUser.content;
}

const defaultObjectState = {
  isFetching: false,
  error: null,
  content: {},
}

const defaultPageableState = {
  isFetching: false,
  error: null,
  content: [],
  requestParams: {
    page: 0,
    size: 25,
    filter: { }
  },
  totalPages: 0,
  sizePerPageList: [10, 20, 50, 100]
}

export default {
  auth: initAuth(),
  config: {
    isFetching: false,
    isConfigLoaded: false,
    error: null,
    json: {}
  },
  currentUser: {
    isFetching: false,
    error: null,
    content: initialCurrentUser(),
  },
  modal: {
    modalType: null,
    modalProps: {},
  },
  locale: initializeLocale(),
  organizations: defaultPageableState, 
  organization: defaultObjectState,
  training: defaultObjectState,
  trainings: defaultPageableState,
  trainingElement: defaultObjectState,
  trainingElements: defaultPageableState,
  user: {
    ...defaultObjectState,
    trainings: defaultPageableState
  },
  // userTrainings: defaultPageableState,
  users: defaultPageableState,
}