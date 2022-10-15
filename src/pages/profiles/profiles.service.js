class ProfilesService {
  async getAll() {
    // TODO: temp data
    return [
      {
        key: 1,
        id: "Example 1",
        resume:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        name: "MyName1",
        dni: "12345678A",
      },
      {
        key: 2,
        id: "Example 2",
        resume:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        name: "MyName2",
        dni: "12345678A",
      },
      {
        key: 3,
        id: "Example 3",
        resume:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        name: "MyName3",
        dni: "12345678A",
      },
    ];
  }
}

export default ProfilesService;
