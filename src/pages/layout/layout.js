import React from "react";
import Button from "react-bootstrap/Button";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "./layout.css";
import EventService from "../../services/event.service";
import Nav from "../../components/nav/nav";
import AboutMe from "../../components/about-me/about-me";

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
        <Container>
          <div>
            <div className="home-header">
              <h1>Privacy tools</h1>
              <p>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={this.handleShowAboutMe.bind(this)}
                >
                  Saber más
                </Button>
              </p>
              <hr />
            </div>
            <div className="home-body">
              <Outlet />
            </div>
          </div>
        </Container>
        <AboutMe aboutMeEventName={this.state.aboutMeEventName} />
        <Nav />
      </div>
    );
  }
}

export default Layout;
