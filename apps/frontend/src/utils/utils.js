import jwt_decode from 'jwt-decode';

import * as CONST from '../constants/utils';

/**
 * Auth
 */
export function decodeUserProfile(idToken) {
  try {
    return jwt_decode(idToken);
  } catch (err) {
    return null;
  }
}

export function loadCurrentUser() {
  try {
    return objectStore.get(CONST.CURRENT_USER);
  } catch (error) {
    console.error('Cannot get current user');
    return null;
  }
}

export function loadUserProfile() {
  try {
    const idToken = localStorage.getItem(CONST.ID_TOKEN);
    return jwt_decode(idToken);
  } catch (err) {
    return null;
  }
}


/**
 * Save objects in local storage
 */
export const objectStore = {
  get: function (key) {
    return JSON.parse(localStorage.getItem(key));
  },
  set: function (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  },
  remove: function (key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }
}


/**
 * Locale 
 */
export function loadLocale() {
  try {
    return localStorage.getItem(CONST.LOCALE);
  } catch (err) {
    return null;
  }
}

export function getBrowserLocale() {
  var locale = getBrowserLanguage().toLowerCase();
  if (locale === 'de' || locale === 'de-at' || locale === 'de-de' || locale === 'de-li' || locale === 'de-lu' || locale === 'de-ch') {
    return 'de'
  } else if (locale === 'ru' || locale === 'ru-ru' || locale === 'ru-md') {
    return 'ru'
  } else {
    return 'en'
  }
}

function getBrowserLanguage() {
  // IE
  if (navigator.browserLanguage) {
    return navigator.browserLanguage;
  }
  // All other vendors
  else if (navigator.language) {
    return navigator.language;
  }
}

export const createError = (ex) => {
  if (ex && ex instanceof TypeError) {
    return { message: ex.message };
  }
  if (ex && ex.response && ex.response.data) {
    return Array.isArray(ex.response.data) ? {...ex.response.data[0]} : {...ex.response.data};
  }
  // console.log("Create error:", ex, ", json:", JSON.stringify(ex));
  return ex;
}