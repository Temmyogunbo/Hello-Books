/**
 * LocalStorageMock serve as a mock of the localStorage for testing in Jest
 * @class LocalStorageMock
 */
class LocalStorage {
  /**
     * It creates a new instance of this class
     *
     * @constructor
     *
     * @memberOf LocalStorage
     */
  constructor() {
    /** @type {Object} */
    this.store = {};
  }

  /**
     * It clears the store
     *
     * @memberOf LocalStorage
     *
     * @returns {undefined}
     */
  clear() {
    this.store = {};
  }

  /**
     * it returns the value stored on the supplied key
     *
     * @memberOf LocalStorage
     *
     * @param {string} key The item's key to retrieve from
     *
     * @returns {undefined}
     */
  getItem(key) {
    return this.store[key] || null;
  }

  /**
     * sets the store with the supplied key
     *
     * @memberOf LocalStorage
     *
     * @param {Object} key The key to store
     * @param {string} value The value to set the key to
     *
     * @returns {undefined}
     */
  setItem(key, value) {
    this.store[key] = value;
  }

  /**
 * it removes item from the local storage
 *
 * @param {string} key to be removed
 *
 * @memberof LocalStorage
 *
 * @returns {object} key to remove
 */
  removeItem(key) {
    delete this.store[key];
  }
}
export default LocalStorage;
