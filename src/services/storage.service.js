import { get, set, entries } from "idb-keyval";

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

  async getAll() {
    return entries();
  }

  async getAllProfiles() {
    return (await entries())
      .filter((o) => o[0].startsWith("profile"))
      .map((o) => o[1]);
  }

  async countProfiles() {
    return (await this.getAllProfiles()).length;
  }
}

export default StorageService;
