import { get, set, entries, del } from "idb-keyval";

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

  /**
   * @param {string} key
   * @returns {Promise<boolean>}
   */
  async delete(key) {
    await del(key);
    return !(await this.get(key));
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
