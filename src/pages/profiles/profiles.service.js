import Profile from "../../classes/profile";
import StorageService from "../../services/storage.service";

class ProfilesService {
  constructor() {
    this.db = new StorageService();
  }
  /**
   *
   * @returns {Promise<Profile[]>}
   */
  async getAll() {
    const data = await this.db.getAllProfiles();
    return data.map((o) => Profile.copy(o));
  }
}

export default ProfilesService;
