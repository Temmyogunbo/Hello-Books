import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignInPage from '../components/accounts/SignInPage';
import SignUpPage from '../components/accounts/SignUpPage';
import SplashScreen from './Welcome';
import CheckSignedInContainer from '../../utils/CheckSignedInContainer';
import BookPage from '../components/Collections/BookPage';
import CollectionsPage from '../components/Collections';
import HistoryPage from '../components/users/HistoryPage';
import Notifications from '../../src/components/Notifications';
import '../sass/style.scss';
import '../../../node_modules/toastr/toastr.scss';
import PageNotFound from './PageNotFound';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

/**It returns a div element containg app routes
 *
 *
 * @returns {object} jsx
 */
function App() {
  return (
    <div style={{ height: "100vh" }}>
      <NavigationBar />
      <Switch>
        <Route path="/signin" component={SignInPage} />
        <Route exact path="/" component={SplashScreen} />
        <Route path="/signup" component={SignUpPage} />
        <Route
          exact
          path="/collections"
          component={CheckSignedInContainer(CollectionsPage)}
        />
        <Route
          exact
          path="/history"
          component={CheckSignedInContainer(HistoryPage)}
        />
        <Route
          path="/collections/books/:bookId"
          component={CheckSignedInContainer(BookPage)}
        />
        <Route
          path="/notifications"
          component={CheckSignedInContainer(Notifications)}
        />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

