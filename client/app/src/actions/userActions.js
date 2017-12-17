import axios from 'axios';
import toastr from 'toastr';

import setAuthToken from '../../utils/authorization';
import {
  CHANGE_USERS_PASSWORD,
  LOG_OUT_USERS,
  SET_AUTH_USERS,
  GET_USER_HISTORY,
} from '../constants/actionTypes';

/**Dispatch an action to change user password
 *
 * @return {object} - user
 *
 * @param {object} user - created user payload
 */
export const changeUserPassword = user => ({
  type: CHANGE_USERS_PASSWORD,
  user
});

/**Dispatch an action that fetches user borrow history
 *
 * @return {object} All history
 *
 * @param {detailedHistory} detailedHistory - dispatched history object
 */
export const getHistory = detailedHistory => ({
  type: GET_USER_HISTORY,
  detailedHistory
});

/**Dispatches an action of user
 *
 * @return {object} - an object of created user
 *
 * @param {object} user - created user payload
 */
export const setAuthUser = user => ({
  type: SET_AUTH_USERS,
  user
});
/**Dispatches an action that logs out a user
 *
 * @return {object} - an object containing action type only
 */
export const logOutUser = () => ({
  type: LOG_OUT_USERS
});

/**It returns borrow history of a user
 *
* @return {object} - returns an object of user's history

* @param {object} userData - contains user id
*/
export const getHistoryAction = userData => dispatch => {
  let historyRoute = `/api/v1/users/${userData.userId}/history?page=` +
  `${userData.currentPage}&itemsCountPerPage=${userData.itemsCountPerPage}`;
  if (userData.returned) {
    historyRoute =
      `/api/v1/users/${userData.userId}/history?page=${userData.currentPage}&` +
      `itemsCountPerPage=${userData.itemsCountPerPage}&` +
      `returned=${userData.returned}`;
  }
  return axios.get(historyRoute)
    .then((response) => {
      dispatch(getHistory(response.data));
    })
    .catch((error) => {
      toastr.error(error.response.data.msg);
    });
};
/**It returns user object with token
 *
 * @return {object} - created user from the server side
 *
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

/**It returns user object with token
 *
 *  @return {object} - array of users
 *
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
/**it returns an empty object
 *
*  @return {object} - empty object

* @param {object} userData - logged in user payload
*/
export const changePasswordAction = userData => dispatch =>
  axios.put('/api/v1/users/change-password', userData)
    .then((response) => {
      dispatch(changeUserPassword({}));
      toastr.success('Password changed');
    }).catch((error) => {
      toastr.error(error.response.data.msg);
    });

/**It clears local storage and set token to false
 *
 * Destroy the user token and remove from localstorage
 *
 *@returns{undefined}
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
  signOutAction,
  changePasswordAction
};
