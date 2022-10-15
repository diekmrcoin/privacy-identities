import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Profiles from "./pages/profiles/profiles";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div class="App">
      <Container>
        <Profiles />
      </Container>
    </div>
  );
}

export default App;
