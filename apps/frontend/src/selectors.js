import { createSelector } from 'reselect';

/**
 * Common selectors
 */
export const getRolesSelector = state => state.config.roles;
export const getAdminRolesSelector = state => state.config.roles.admin;
export const getCurrentUserSelector = state => state.currentUser.content;
export const getLocaleSelector = state => state.locale;
export const getLinksSelector = state => state.config.links;
export const getHomeUrlSelector = state => state.config.links.home.url;
export const authorityToRole = a => a.startsWith('ROLE_') ? a.substring(5) : a;
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
export const getOrganizationsParams = state => state.organizations.requestParams;
export const getOrganizationsSelector = state => state.organizations;
export const getOrganizationSelector = state => state.organization.content;
export const getOrganizationsOptionsSelector = createSelector(
  getOrganizationsSelector,
  organizations => organizations.content ? organizations.content.map(organization => ({ label: organization.name, value: organization.id })): {});

// Training

export const createTrainingUrl = state => state.config.links.training.api.create;
export const getTrainingUrl = state => state.config.links.training.api.get;
export const getTrainingsParams = state => state.trainings.requestParams;
export const getTrainingSelector = state => state.training;
export const getTrainingContentSelector = state => state.training.content;
export const getTrainingsSelector = state => state.trainings;
export const getTrainingsUrl = state => state.config.links.trainings.api.get;

export const getTrainingElementSelector = state => state.trainingElement;
export const createTrainingElementUrl = state => state.config.links.trainingElement.api.create;
export const deleteTrainingElementUrl = state => state.config.links.trainingElement.api.delete;
export const getTrainingElementUrl = state => state.config.links.trainingElement.api.get;
export const updateTrainingElementUrl = state => state.config.links.trainingElement.api.update;
export const trainingElementToOptionSelector = element => ({ label: element.name, value: element.id });
export const getTrainingElementsRequestParams = state => state.trainingElements.requestParams;
export const getTrainingElementsSelector = state => state.trainingElements;
export const getTrainingElementsOptionsSelector = createSelector(
  getTrainingElementsSelector,
  elements => elements.content ? elements.content.map(element => trainingElementToOptionSelector(element)) : {});
export const getTrainingElementsUrl = state => state.config.links.trainingElements.api.get;

// Training stages

export const createTrainingStageUrl = state => state.config.links.trainingStage.api.create;
export const getTrainingStagesUrl = state => state.config.links.trainingStages.api.get;
<<<<<<< HEAD
export const getTrainingStagesSelector = state => state.training.stages;
=======
export const createTrainingStageUrl = state => state.config.links.trainingStage.api.create;
export const deleteTrainingStageUrl = state => state.config.links.trainingStage.api.delete;
export const updateTrainingStageUrl = state => state.config.links.trainingStage.api.update;

export const getTrainingStagesSelector = state => state.training.stages;
export const getTrainingStagesParamsSelector = state => state.training.stages.requestParams;
>>>>>>> feature-training-stage

// Users
export const getCurrentUserUrl = state => state.config.links.currentUser.api.get;
export const getCurrentUserTrainingsUrl = state => state.config.links.currentUserTrainings.api.get;

export const getUserSelector = state => state.user;
export const getUserContentSelector = state => state.user.content;
export const getUserUrl = state => state.config.links.user.api.get;
export const getDeleteUserUrl = state => state.config.links.user.api.delete;
export const getUserTrainingsUrl = state => state.config.links.userTrainings.api.get;
export const getUserTrainingsSelector = state => state.user.trainings;
export const updateUserUrl = state => state.config.links.user.api.update;
export const getUserDisplayNameSelector = user => user.name ? user.name : user.username;
export const userToOptionSelector = user => user ? ({ label: user.name || user.username || user.email, value: user.id }) : ({});

export const getUsersUrl = state => state.config.links.users.api.get;
export const getUsersParams = state => state.users.requestParams;
export const getUsersSelector = state => state.users;
export const getUsersOptionsSelector = createSelector(
  getUsersSelector,
  organizations => organizations.content ? organizations.content.map(user => userToOptionSelector(user)) : {});
