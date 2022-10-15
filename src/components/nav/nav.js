import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FaUserPlus, FaCloudUploadAlt, FaList, FaHome } from "react-icons/fa";
import "./nav.css";
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
      <div className="nav-root">
        <Button size="lg">
          <Link to="/">
            <FaHome />
          </Link>
        </Button>
        <Button size="lg">
          <Link to="/profiles">
            <FaList />
          </Link>
        </Button>
        <Button size="lg" onClick={this.showToast.bind(this)}>
          <FaCloudUploadAlt />
        </Button>
        <Button size="lg">
          <Link to="/profile">
            <FaUserPlus />
          </Link>
        </Button>
        <Toast eventName={this.toastEvent} />
      </div>
    );
  }
}

export default Nav;
