import Profile from "../../classes/profile";
import StorageService from "../../services/storage.service";

class ProfileService {
  constructor() {
    this.db = new StorageService();
  }

  /**
   * @return {Promise<boolean>}
   */
  async save(data) {
    const nextId = (await this.db.countProfiles()) + 1;
    const profile = Profile.copy({ ...data, key: nextId });
    await this.db.set(`profile.${nextId}`, profile);
    return true;
  }
}

export default ProfileService;
