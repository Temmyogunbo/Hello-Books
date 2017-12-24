import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import jwtDecode from 'jwt-decode';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import 'babel-polyfill';
import axios from 'axios';
import toastr from 'toastr';

import setAuthToken from '../utils/authorization';
import { setAuthUser, signOutAction } from './actions/userActions';
import rootReducer from './reducers/rootReducer';
import App from './components/App';
import '../src/asset/sass/style.scss';
import '../../node_modules/toastr/toastr.scss';

toastr.options = {
  preventDuplicates: true,
  preventOpenDuplicates: true
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
const history = createHistory();

axios.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401 || error.response.status === 403) {
    store.dispatch(signOutAction());
  }
  return Promise.reject(error);
});

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setAuthUser(jwtDecode(localStorage.jwtToken)));
}
window.$ = $;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
