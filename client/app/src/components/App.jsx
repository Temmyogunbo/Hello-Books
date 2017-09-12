import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import WelcomeMessage from './users/WelcomeMessage';
import SignIn from './users/SignIn';
import SignUp from './users/SignUp';
import DashboardPage from './users/DashboardPage';
import AdminDashboardPage from './users/AdminDashboardPage';
import '../sass/style.scss';
import '../../../../node_modules/toastr/toastr.scss';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={WelcomeMessage} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/signup' component={SignUp} />
      <Route path='/dashboard' component={DashboardPage} />
      <Route path='/admindashboard' component={AdminDashboardPage} />
    </Switch>
  </Router>
);

export default App;

