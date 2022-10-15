import React from "react";
import "./App.css";
import Profiles from "./pages/profiles/profiles";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import AboutMe from "./components/about-me/about-me";
import EventService from "./services/event.service";
import Nav from "./components/nav/nav";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMeEventName: "showAboutMe",
    };
  }
  handleShowAboutMe() {
    EventService.publish(this.state.aboutMeEventName);
  }
  render() {
    return (
      <div className="App">
        <Container>
          <div className="App-header">
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
          </div>
          <div className="App-body">
            <Profiles />
          </div>
        </Container>
        <AboutMe aboutMeEventName={this.state.aboutMeEventName} />
        <Nav />
      </div>
    );
  }
}

export default App;
