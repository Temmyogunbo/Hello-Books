import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignInPage from '../components/Accounts/SignInPage';
import SignUpPage from '../components/Accounts/SignUpPage';
import SplashScreen from './SplashScreen';
import CheckSignedInContainer from '../../utils/CheckSignedInContainer';
import BookPage from '../components/Books/BookPage';
import CollectionsPage from '../components/Admin/CollectionsPage';
import HistoryPage from '../components/Users/HistoryPage';
import Notifications from '../../src/components/Admin/Notifications';
import '../sass/style.scss';
import '../../../../node_modules/toastr/toastr.scss';
import NavigationBar from './NavigationBar';
import PageNotFound from './PageNotFound';

const App = () => (
  <div style={{ height: "100vh" }}>
    <NavigationBar />
    <Switch>
      <Route path="/signin" component={SignInPage} />
      <Route exact path="/" component={SplashScreen} />
      <Route path="/signup" component={SignUpPage} />
      <Route exact path="/collections" component={CheckSignedInContainer(CollectionsPage)} />
      <Route exact path="/history" component={CheckSignedInContainer(HistoryPage)} />
      <Route path="/collections/books/:bookId" component={CheckSignedInContainer(BookPage)} />
      <Route path="/notifications" component={CheckSignedInContainer(Notifications)} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default App;

