import React from 'react'

import AboutPage from 'containers/about/AboutPage';
import HomePage from 'containers/home/HomePage';
import LoginPage from 'containers/login/LoginPage';
import StageResultsPage from 'containers/stage/StageResultsPage';
import NotFound from 'containers/notFound/NotFound';

import { Router, Route, Switch } from 'react-router-dom';

export const createRoutes = (history, links) => (
  <Router history={history}>
  <Switch>
    <Route exact path={links.home.url} component={HomePage} />
    <Route exact path={links.about.url} component={AboutPage} />
    <Route exact path={links.calculator.url} component={StageResultsPage} />
    <Route exact path={links.login.url} component={LoginPage} />
    <Route path='*' component={NotFound} />
  </Switch>
  </Router>
);

// module.exports = createRoutes;
// export default createRoutes;