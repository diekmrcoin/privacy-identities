class Profile {
  constructor() {
    this.key = null;
    this.id = null;
    this.resume = null;
    this.name = null;
    this.dni = null;
  }
  static copy(o) {
    const p = new Profile();
    Object.assign(p, o);
    return p;
  }
}

export default Profile;
