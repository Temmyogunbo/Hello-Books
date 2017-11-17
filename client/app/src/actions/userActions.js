import axios from 'axios';
import toastr from 'toastr';
import jwtDecode from 'jwt-decode';
import Authorization from '../../utils/authorization';
import {
  SET_AUTH_USERS,
  SET_AUTH_USERS_ERROR,
  GET_USER_HISTORY,
  GET_USER_HISTORY_ERROR
} from '../constants/actionTypes';

/**
 *
 * @return {object} All history
 * @param {detailedHistory} detailedHistory - dispatched history object
 */
const getHistory = detailedHistory => ({
  type: GET_USER_HISTORY,
  detailedHistory
});
/**
 *
 * @return {object} error
 * @param {error} error - dispatched error object
 */
const getHistoryError = error => ({
  type: GET_USER_HISTORY_ERROR,
  error
});
/**
 * @return {object} - an object of created user
 * sends created user response as a payload to the reducer
 * @param {object} user - created user payload
 */
export const setAuthUser = user => ({
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
* @return {object} - returns an object of user's history
* @param {object} userData - contains user id
*/
export const getHistoryAction = userData => dispatch =>
  axios.get(`/api/v1/users/${userData.userId}/history`)
    .then((response) => {
      dispatch(getHistory(response.data));
    })
    .catch((error) => {
      dispatch(getHistoryError(error.response.data));
      return error;
    });
/**
 * @return {object} - created user from the server side
 * sends an object of the created user and returns an auth token for the user
 * @param {object} userData - userdetails to be registered
 */
export const signupAction = userData => dispatch =>
  axios.post('/api/v1/users/signup', userData)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      Authorization.setAuthToken(token);
      dispatch(setAuthUser(jwtDecode(token)));
      toastr.success('You successfully signed up');
    })
    .catch((error) => {
      dispatch(setAuthUserError(error.response.data));
      toastr.error(error.response.data.msg);
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
export const signinAction = user => dispatch => (
  axios.post('/api/v1/users/signin', user)
)
  .then(({ data }) => {
    const token = data.token;
    localStorage.setItem('jwtToken', token);
    Authorization.setAuthToken(token);
    dispatch(setAuthUser(jwtDecode(token)));
    toastr.success('You are Logged in successfully');
  }).catch((error) => {
    dispatch(setAuthUserError(error.response.data));
    toastr.error(error.response.data.msg);
  });
/**
 *  @return {object} - array of users
 * Destroy the user token and remove from localstorage
 *
 */
export const signOutAction = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  Authorization.setAuthToken(false);
  dispatch(setAuthUser({}));
};

export default {
  getHistoryAction,
  signupAction,
  signinAction,
  signOutAction
};
