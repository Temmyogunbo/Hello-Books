import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Authorization from '../../utils/authorization';
import { SET_AUTH_USERS, SET_AUTH_USERS_ERROR } from '../constants/actionTypes';
/**
 * @return {object} - an object of created user
 * sends created user response as a payload to the reducer
 * @param {object} user - created user payload
 */
const setAuthUser = user => ({
  type: SET_AUTH_USERS,
  user
});
/**
 *
 * @return {object} error
 * @param {error} error - dispatched error object
 */
const setAuthUserError = error => ({
  type: SET_AUTH_USERS_ERROR,
  error
});


/**
 * @return {object} - created user from the server side
 * sends an object of the created user and returns an auth token for the user
 * @param {object} userData - userdetails to be registered
 */
const signupAction = userData => dispatch =>
  axios.post('/api/v1/users/signup', userData).then((response) => {
  	console.log('i see u', response)
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    Authorization.setAuthToken(token);
    dispatch(setAuthUser(jwtDecode(token)));
  }).catch((error) => {
    dispatch(setAuthUserError(error.response.data));
  });


/**
 * @return {object} - returns an object of logged in user
 *sends the decoded user payload to the reducer
 * @param {object} user - logged in user payload
 */

/**
 *  @return {object} - array of users
 * sends the users details to be verified before proceeding
 * @param {object} user - logged in user payload
 */
const signinAction = (user) => {
	return dispatch =>
axios.post('/api/v1/users/signin', user).then((response) => {
	console.log('enter there', user)
  const token = response.data.token;
  localStorage.setItem('jwtToken', token);
  Authorization.setAuthToken(token);
  dispatch(setAuthUser(jwtDecode(token)));
}).catch((error) => {
  dispatch(setAuthUserError(error.response.data));
  return error;
});
}

export default {
	signupAction,
	signinAction
};
