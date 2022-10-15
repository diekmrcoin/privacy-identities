import React from "react";
import { useParams } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: undefined };
  }
  componentDidMount() {
    this.setState({ id: this.props.params.id });
  }
  render() {
    if (this.state.id) return this.renderDetail();
    return this.renderCreate();
  }
  renderDetail() {
    return <h1>Detalle del perfil {this.state.id}</h1>;
  }
  renderCreate() {
    return <h1>Creando perfil</h1>;
  }
}

function WithParams(props) {
  return <Profile {...props} params={useParams()} />;
}

export default WithParams;
