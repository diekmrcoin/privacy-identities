import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FaUserPlus, FaCloudUploadAlt, FaList, FaHome } from "react-icons/fa";
import "./nav.css";
import Toast from "../toast/toast";
import EventService from "../../services/event.service";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.toastEvent = "Nav.event.showToast";
    this.buttonList = [
      {
        icon: <FaHome />,
        link: "/",
      },
      {
        icon: <FaList />,
        link: "/profiles",
      },
      {
        icon: <FaCloudUploadAlt />,
        link: "/",
        onClick: this.showToast.bind(this),
      },
      {
        icon: <FaUserPlus />,
        link: "/profile",
      },
    ];
  }

  renderButtons() {
    return this.buttonList.map((button, index) => {
      return (
        <Col key={index}>
          <Button onClick={button.onClick}>
            <Link to={button.link}>{button.icon}</Link>
          </Button>
        </Col>
      );
    });
  }
  showToast() {
    EventService.publish(this.toastEvent);
  }
  render() {
    return (
      <div className="sticky">
        <Row>{this.renderButtons()}</Row>
        <Toast
          eventName={this.toastEvent}
          title="Oh no!"
          subtitle="Just now"
          body="El guardado en la nube llegará más adelante."
        />
      </div>
    );
  }
}

export default Nav;
