import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Authentication from '../components/accounts/Authentication';
import SignInForm from '../components/forms/SignInForm';
import SignUpForm from '../components/forms/SignUpForm';
import SplashScreen from './Welcome';
import CheckSignedInContainer from '../../utils/CheckSignedInContainer';
import BookPage from '../components/Collections/BookPage';
import Collections from '../components/Collections';
import Users from '../components/Users';
import Notifications from '../../src/components/Notifications';
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
    <div>
      <NavigationBar />
      <Switch>
        <Route path="/signin" render={
          (props) =>
            (
              <Authentication
                {...props}
                render={ownProps =>
                  (
                    <SignInForm
                      signin={ownProps.signin}
                    />
                  )}
              />
            )
        } />
        <Route path="/signup" render={
          (props) =>
            (
              <Authentication
                {...props}
                render={ownProps =>
                  (
                    <SignUpForm
                      signup={ownProps.signup}
                    />
                  )}
              />
            )
        } />
        <Route exact path="/" render={
          (props) =>
            (
              <Authentication
                {...props}
                render={ownProps =>
                  (
                    <SplashScreen />
                  )}
              />
            )
        } />

        <Route
          exact
          path="/collections"
          component={CheckSignedInContainer(Collections)}
        />
        <Route
          exact
          path="/history"
          component={CheckSignedInContainer(Users)}
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

