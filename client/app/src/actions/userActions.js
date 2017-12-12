import axios from 'axios';
import toastr from 'toastr';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../../utils/authorization';
import {
  CHANGE_USERS_PASSWORD,
  LOG_OUT_USERS,
  SET_AUTH_USERS,
  GET_USER_HISTORY,
} from '../constants/actionTypes';

/**
 * @return {object} - an object of
 * sends created user response as a payload to the reducer
 * @param {object} user - created user payload
 */
export const changeUserPassword = user => ({
  type: CHANGE_USERS_PASSWORD,
  user
});

/**
 *
 * @return {object} All history
 * @param {detailedHistory} detailedHistory - dispatched history object
 */
export const getHistory = detailedHistory => ({
  type: GET_USER_HISTORY,
  detailedHistory
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
 * @return {object} - an object containing action type only
 */
export const logOutUser = () => ({
  type: LOG_OUT_USERS
});

/**
* @return {object} - returns an object of user's history
* @param {object} userData - contains user id
*/
export const getHistoryAction = userData => dispatch => {
  let historyRoute = `/api/v1/users/${userData.userId}/history?page=${userData.currentPage}&itemsCountPerPage=${userData.itemsCountPerPage}`;
  if (userData.returned) {
    historyRoute =
      `/api/v1/users/${userData.userId}/history?page=${userData.currentPage}&itemsCountPerPage=${userData.itemsCountPerPage}&returned=${userData.returned}`;
  }
  return axios.get(historyRoute)
    .then((response) => {
      dispatch(getHistory(response.data));
    })
    .catch((error) => {
      toastr.error(error.response.data.errors[0].msg);
    });
};
/**
 * @return {object} - created user from the server side
 * sends an object of the created user and returns an auth token for the user
 * @param {object} userData - userdetails to be registered
 */
export const signupAction = userData => dispatch =>
  axios.post('/api/v1/users/signup', userData)
    .then((response) => {
      const {
        email,
        userName,
        id,
        role,
        membership,
        fullName,
        token,
        msg
      } = response.data;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('role', response.data.role);
      setAuthToken(token);
      dispatch(setAuthUser({
        email,
        userName,
        id,
        role,
        membership,
        fullName,
        token,
        msg
      }));
      toastr.success('You successfully signed up');
    })
    .catch((error) => {
      toastr.error(error.response.data.msg);
    });
/**
 *  @return {object} - array of users
 * sends the users details to be verified before proceeding
 * @param {object} user - logged in user payload
 */
export const signinAction = user => dispatch =>
  axios.post('/api/v1/users/signin', user)
    .then((response) => {
      const {
        email,
        userName,
        id,
        role,
        membership,
        fullName,
        token,
        msg
      } = response.data;

      localStorage.setItem('jwtToken', token);
      localStorage.setItem('role', response.data.role);
      setAuthToken(token);
      dispatch(setAuthUser({
        email,
        userName,
        id,
        role,
        membership,
        fullName,
        msg
      }));
      toastr.success('You are Logged in successfully');
    }).catch((error) => {
      toastr.error(error.response.data.msg);
    });
/**
*  @return {object} - empty object
* @param {object} userData - logged in user payload
*/
export const ChangePasswordAction = userData => dispatch =>
  axios.put('/api/v1/users/change-password', userData)
    .then((response) => {
      dispatch(changeUserPassword(response.data));
      toastr.success('Password changed');
    }).catch((error) => {
      toastr.error(error.response.data.msg);
    });

/**
 *  @return {object} - array of users
 * Destroy the user token and remove from localstorage
 *
 */
export const signOutAction = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(logOutUser());
  localStorage.clear();
};

export default {
  getHistoryAction,
  signupAction,
  signinAction,
  signOutAction
};
