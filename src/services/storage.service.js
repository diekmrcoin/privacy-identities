import { get, set } from "idb-keyval";

class StorageService {
  /**
   * @param {string} key
   * @returns {Promise<any>}
   */
  async get(key) {
    return get(key);
  }

  /**
   * @param {string} key
   * @param {any} value
   * @returns {Promise<void>}
   */
  async set(key, value) {
    return set(key, value);
  }
}

export default StorageService;
