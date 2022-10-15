class ProfilesService {
  async getAll() {
    // TODO: temp data
    const data = [];
    for (let i = 0; i < 3; i++) {
      data.push({
        key: i,
        id: `Example ${i}`,
        resume:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        name: `MyName${i}`,
        dni: "12345678A",
      });
    }
    return data;
  }
}

export default ProfilesService;
