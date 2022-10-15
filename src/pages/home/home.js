import React from "react";
import "./home.css";
import EventService from "../../services/event.service";

class Home extends React.Component {
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
      <div>
        <h3>Hello world</h3>
      </div>
    );
  }
}

export default Home;
