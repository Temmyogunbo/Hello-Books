import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import Signup from './auth/Signup.jsx';
import store from '../store/store';
import Authorization from '../../utils/authorization';
import { setAuthUser } from '../actions/userActions';
import Navigation from './users/Navigation.jsx';
import WelcomeMessage from './users/WelcomeMessage.jsx';
import SignIn from './users/SignIn.jsx';
import SignUp from './users/SignUp.jsx';
import '../sass/style.scss';
import '../../../../node_modules/toastr/toastr.scss';

const history = createBrowserHistory();

if (localStorage.jwtToken) {
  Authorization.setAuthToken(localStorage.jwtToken);
  store.dispatch(setAuthUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={WelcomeMessage} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
