import React from "react";
import Button from "react-bootstrap/Button";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./layout.css";
import EventService from "../../services/event.service";
import Nav from "../../components/nav/nav";
import AboutMe from "../../components/about-me/about-me";
import { Col, Row } from "react-bootstrap";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMeEventName: "Layout.event.showAboutMe",
    };
  }
  handleShowAboutMe() {
    EventService.publish(this.state.aboutMeEventName);
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <Container className="content">
          <div>
            <div className="home-header">
              <Container className="app-title">
                <Row>
                  <Col xs={8}>
                    <h1>Privacy tools</h1>
                  </Col>
                  <Col xs={4}>
                    <Button
                      className="about-me-button"
                      variant="outline-primary"
                      size="sm"
                      onClick={this.handleShowAboutMe.bind(this)}
                    >
                      Saber más
                    </Button>
                  </Col>
                </Row>
              </Container>
              <hr />
            </div>
            <div className="home-body">
              <Outlet />
            </div>
          </div>
        </Container>
        <AboutMe aboutMeEventName={this.state.aboutMeEventName} />
      </div>
    );
  }
}

export default Layout;
