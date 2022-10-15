import React from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import BToast from "react-bootstrap/Toast";
import EventService from "../../services/event.service";
import { FaExclamationTriangle } from "react-icons/fa";

class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
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
      <ToastContainer className="p-3" position="bottom-center">
        <BToast
          show={this.state.show}
          onClose={this.close.bind(this)}
          delay={3000}
          autohide
        >
          <BToast.Header>
            <FaExclamationTriangle />{" "}
            <strong className="me-auto">Oh no!</strong>
            <small>Just now</small>
          </BToast.Header>
          <BToast.Body>
            El guardado en la nube llegará más adelante.
          </BToast.Body>
        </BToast>
      </ToastContainer>
    );
  }
}

export default Toast;
