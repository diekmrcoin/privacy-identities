import React from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import "./profiles.css";
import ProfilesService from "./profiles.service";
import { FaPencilAlt } from "react-icons/fa";

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
      <div className="profile-list">
        <Accordion defaultActiveKey="-1">
          {this.state.profiles.map((v) => (
            <Accordion.Item eventKey={v.key.toString()} key={v.key}>
              <Accordion.Header>{v.id}</Accordion.Header>
              <Accordion.Body>
                <p className="edit-profile">
                  {v.name} {v.dni}
                  <Link to={"/profile/" + v.key}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="edit-profile-button"
                    >
                      <FaPencilAlt color="white" />
                    </Button>{" "}
                  </Link>
                </p>
                <hr />
                <p>{v.resume}</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    );
  }
}

export default Profiles;
