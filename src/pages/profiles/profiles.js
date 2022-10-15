import React from "react";
import ProfilesService from "./profiles.service";

class Profiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profiles: [] };
    this.service = new ProfilesService();
  }
  componentDidMount() {
    this.service.getAll().then((data) => {
      this.setState({ profiles: data });
    });
  }
  render() {
    // TODO: display a quick resume of the data for each profile
    return (
      <div>
        <ul>
          {this.state.profiles.map((v) => (
            <li key={v.key}>{v.id}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Profiles;
