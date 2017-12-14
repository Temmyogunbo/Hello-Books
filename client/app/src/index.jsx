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
import setAuthToken from '../utils/authorization';
import { setAuthUser } from './actions/userActions';
import rootReducer from './reducers/rootReducer';
import App from './components/App';
import './sass/style.scss';
import '../../node_modules/toastr/toastr.scss';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setAuthUser(jwtDecode(localStorage.jwtToken)));
}
const history = createHistory();
window.$ = $;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
