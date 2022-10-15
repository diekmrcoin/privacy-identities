import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Alert from "react-bootstrap/Alert";
import { subscribe, unsubscribe } from "../../services/event.service";

class AboutMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }
  componentDidMount() {
    subscribe(this.props.aboutMeEventName, () => {
      this.setState({ show: true });
    });
  }
  componentWillUnmount() {
    unsubscribe(this.props.aboutMeEventName);
  }
  handleClose() {
    this.setState({ show: false });
  }
  render() {
    return (
      <Offcanvas show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Información</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Ésta webapp no usa cookies ni ningún tipo de seguimiento.</p>
          <p>
            Se almacenan los datos en local usando la tecnología IndexedDB del
            navegador.
            <br />
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API"
              target="_blank"
              rel="noreferrer"
            >
              Más información en mdn web docs
            </a>
          </p>
          <Alert variant="danger">
            Borrar caché te hará perder los datos para siempre.
          </Alert>
          <p>En un futuro se añadirá función multidispositivo.</p>
          <hr />
          <p>
            <small>
              Éste proyecto es libre y gratuito.
              <br />
              Revisa el código o colabora{" "}
              <a
                href="https://github.com/diekmrcoin/privacy-identities"
                target="_blank"
                rel="noreferrer"
              >
                aquí
              </a>
              .
            </small>
          </p>
          <p>
            <small>
              Desarrollado por{" "}
              <a
                href="https://twitter.com/diekmrcoin"
                target="_blank"
                rel="noreferrer"
              >
                @diekmrcoin
              </a>
              .
            </small>
          </p>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }
}

export default AboutMe;
