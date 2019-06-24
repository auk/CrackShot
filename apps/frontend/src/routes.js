import React from 'react'

import AboutPage from 'containers/about/AboutPage';
import HomePage from 'containers/home/HomePage';
import LoginPage from 'containers/login/LoginPage';
import OrganizationPage from 'containers/organizations/OrganizationPage';
import OrganizationsPage from 'containers/organizations/OrganizationsPage';
import StageResultsPage from 'containers/stage/StageResultsPage';
import TrainingPage from 'containers/trainings/TrainingPage';
import TrainingElementsPage from 'containers/trainings/TrainingElementsPage';
import UserPage from 'containers/users/UserPage';
import UsersPage from 'containers/users/UsersPage';
import NotFound from 'containers/notFound/NotFound';

import { Router, Route, Switch, Redirect } from 'react-router-dom';

export const createRoutes = (history, links, AdminPermission, UserPermission) => (
  <Router history={history}>
  <Switch>
    <Route exact path="/" render={() => <Redirect to={links.calculator.url} />} />
    <Route exact path={links.home.url} component={UserPermission(HomePage)} />
    <Route exact path={links.about.url} component={AboutPage} />
    <Route exact path={links.calculator.url} component={StageResultsPage} />
    <Route exact path={links.login.url} component={LoginPage} />
    <Route exact path={links.organization.url} component={UserPermission(OrganizationPage)} />
    <Route exact path={links.organizations.url} component={AdminPermission(OrganizationsPage)} />
    <Route exact path={links.training.url} component={AdminPermission(TrainingPage)} />
    <Route exact path={links.trainingElements.url} component={AdminPermission(TrainingElementsPage)} />
    <Route exact path={links.user.url} component={AdminPermission(UserPage)} />
    <Route exact path={links.users.url} component={AdminPermission(UsersPage)} />
    <Route path='*' component={NotFound} />
  </Switch>
  </Router>
);

// module.exports = createRoutes;
// export default createRoutes;