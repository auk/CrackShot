import { loadUserProfile, loadLocale, getBrowserLocale, loadCurrentUser } from 'utils/utils';

const initialState = {
  auth: {
    user_name: null,
    role: [],
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
    role: userProfile ? userProfile.authorities : null,
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
  organizations: {
    isFetching: false,
    error: null,
    content: [],
    requestParams: {
      page: 0,
      size: 20,
      filter: { }
    },
    totalPages: 0,
    sizePerPageList: [10, 20, 50, 100],
  },
  organization: {
    isFetching: false,
    error: null,
    content: {},
  },
  users: {
    isFetching: false,
    error: null,
    content: [],
    requestParams: {
      page: 0,
      size: 20,
      filter: { }
    },
    totalPages: 0,
    sizePerPageList: [10, 20, 50, 100],
  },
}