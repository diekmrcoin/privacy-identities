import React from "react";
import "./App.css";
import Profiles from "./pages/profiles/profiles";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import AboutMe from "./pages/about-me/about-me";
import { publish } from "./services/event.service";
import { FaUserPlus } from "react-icons/fa";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMeEventName: "showAboutMe",
    };
  }
  handleShowAboutMe() {
    publish(this.state.aboutMeEventName);
  }
  render() {
    return (
      <div className="App">
        <Container>
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
          <Profiles />
        </Container>
        <AboutMe aboutMeEventName={this.state.aboutMeEventName} />
        <div className="new-element">
          <Button size="lg">
            <FaUserPlus />
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
