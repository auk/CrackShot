/**
 * Common selectors
 */
export const getRolesSelector = state => state.config.roles;
export const getAdminRolesSelector = state => state.config.roles.admin;
export const getLocaleSelector = state => state.locale;
export const getLinksSelector = state => state.config.links;
export const getHomeUrlSelector = state => state.config.links.home.url;

/**
 * Auth selectors
 */
export const getAuthUrl = state => state.config.links.auth.url;
export const getAuthSelector = state => state.auth;