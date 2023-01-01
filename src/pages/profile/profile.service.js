import Profile from "../../classes/profile";
import StorageService from "../../services/storage.service";
import { v4 } from "uuid";

class ProfileService {
  constructor() {
    this.db = new StorageService();
  }

  /**
   * @param {string} id
   * @return {Promise<Profile>}
   */
  async load(id) {
    return await this.db.get(`profile.${id}`);
  }

  /**
   * @return {Promise<Profile>}
   */
  async save(data) {
    const nextId = v4();
    const profile = Profile.copy({ ...data, key: nextId });
    await this.db.set(`profile.${nextId}`, profile);
    return profile;
  }

  /**
   * @return {Promise<Profile>}
   */
  async update(data, id) {
    const profile = Profile.copy({ ...data, key: id });
    await this.db.set(`profile.${id}`, profile);
    return profile;
  }
}

export default ProfileService;
