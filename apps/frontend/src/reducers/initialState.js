import { loadUserProfile, loadLocale, getBrowserLocale } from 'utils/utils';

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
  locale: getBrowserLocale()
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

export default {
  auth: initAuth(),
  config: {
    isFetching: false,
    isConfigLoaded: false,
    error: null,
    json: {}
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
  }
}