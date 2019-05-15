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

// Organization

export const getOrganizationsUrl = state => state.config.links.organizations.api.get;

export const getOrganizationUrl = state => state.config.links.organization.api.get;
export const createOrganizationUrl = state => state.config.links.organization.api.create;
export const deleteOrganizationUrl = state => state.config.links.organization.api.delete;
export const updateOrganizationUrl = state => state.config.links.organization.api.update;

export const getOrganizationsSelector = state => state.organizations;

// Users

export const getUsersUrl = state => state.config.links.users.api.get;

export const getUsersSelector = state => state.users;
