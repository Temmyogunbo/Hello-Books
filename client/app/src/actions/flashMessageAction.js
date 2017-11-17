import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE
} from "../constants/actionTypes";
/**
 * @returns {object} action object
 * 
 * @export
 * @param {any} message 
 */
export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}
/**
 * 
 * 
 * @export
 * @param {any} id 
 * @returns {object} action object 
 */
export function deleteFlashMessage(id) {
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  };
}

export default addFlashMessage;
