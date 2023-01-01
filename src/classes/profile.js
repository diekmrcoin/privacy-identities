class Profile {
  constructor() {
    this.key = "";
    this.id = "";
    this.resume = "";
    this.name = "";
    this.dni = "";
    this.createdAt = new Date();
  }
  static copy(o) {
    const p = new Profile();
    Object.assign(p, o);
    return p;
  }
}

export default Profile;
