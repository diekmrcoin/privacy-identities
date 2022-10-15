import React from "react";
import ProfilesService from "./profiles.service";
import Accordion from "react-bootstrap/Accordion";

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
        <Accordion defaultActiveKey="0">
          {this.state.profiles.map((v) => (
            <Accordion.Item eventKey={v.key.toString()} key={v.key}>
              <Accordion.Header>{v.id}</Accordion.Header>
              <Accordion.Body>{v.resume}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    );
  }
}

export default Profiles;
