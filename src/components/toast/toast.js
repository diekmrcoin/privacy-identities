import React from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import BToast from "react-bootstrap/Toast";
import EventService from "../../services/event.service";
import { FaExclamationTriangle } from "react-icons/fa";

class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.title = this.props.title;
    this.subtitle = this.props.subtitle || "";
    this.body = this.props.body;
    this.position = this.props.position || "bottom-center";
    this.delay = this.props.delay || 3000;
  }
  componentDidMount() {
    EventService.subscribe(this.props.eventName, () => {
      this.setState({ show: true });
    });
  }
  componentWillUnmount() {
    EventService.unsubscribe(this.props.eventName);
  }
  close() {
    this.setState({ show: false });
  }
  render() {
    return (
      <ToastContainer className="p-3" position={this.position}>
        <BToast
          show={this.state.show}
          onClose={this.close.bind(this)}
          delay={this.delay}
          autohide
        >
          <BToast.Header>
            <FaExclamationTriangle />{" "}
            <strong className="me-auto">{this.title}</strong>
            <small>{this.subtitle}</small>
          </BToast.Header>
          <BToast.Body>{this.body}</BToast.Body>
        </BToast>
      </ToastContainer>
    );
  }
}

export default Toast;
