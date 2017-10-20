import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import WelcomeMessagePage from './users/WelcomeMessagePage';
import SignInPage from './users/SignInPage';
import SignUpPage from './users/SignUpPage';
import DashboardPage from './users/DashboardPage';
import AdminDashboardPage from './users/AdminDashboardPage';
import UserDetailsPage from './users/UserDetailsPage';
import CheckSignedInContainer from '../../utils/CheckSignedInContainer';
import HistoryPage from './users/HistoryPage';
import '../sass/style.scss';
import '../../../../node_modules/toastr/toastr.scss';

const history = createHistory();

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={WelcomeMessagePage} />
      <Route exact path="/signin" component={SignInPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route path="/dashboard" component={CheckSignedInContainer(DashboardPage)} />
      <Route path="/admindashboard" component={CheckSignedInContainer(AdminDashboardPage)} />
      <Route path="/user" component={CheckSignedInContainer(UserDetailsPage)} />
      <Route path="/history" component={CheckSignedInContainer(HistoryPage)} />
    </Switch>
  </Router>
);

export default App;

