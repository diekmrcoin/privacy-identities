import React from "react";
import "./nav.css";
import Button from "react-bootstrap/Button";
import { FaUserPlus, FaCloudUploadAlt } from "react-icons/fa";
import Toast from "../toast/toast";
import EventService from "../../services/event.service";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.toastEvent = "Nav.event.showToast";
  }
  showToast() {
    EventService.publish(this.toastEvent);
  }
  render() {
    return (
      <div className="root">
        <Button size="lg" onClick={this.showToast.bind(this)}>
          <FaCloudUploadAlt />
        </Button>
        <Button size="lg">
          <FaUserPlus />
        </Button>
        <Toast eventName={this.toastEvent} />
      </div>
    );
  }
}

export default Nav;
