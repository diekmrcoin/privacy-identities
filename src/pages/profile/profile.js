import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaSave } from "react-icons/fa";
import ProfileService from "./profile.service";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.service = new ProfileService();
    this.state = { id: undefined, form: {} };
    this.save = this.save.bind(this);
    this.changeForm = this.changeForm.bind(this);
  }
  componentDidMount() {
    this.setState({ id: this.props.params.id });
    this.navigate = this.props.navigate;
  }

  changeForm(key) {
    const newForm = {};
    newForm[key] = null;
    return (event) => {
      newForm[key] = event.target.value;
      this.setState({
        ...this.state,
        form: { ...this.state.form, ...newForm },
      });
    };
  }

  async save(event) {
    event.preventDefault();
    const saved = await this.service.save(this.state.form);
    if (!saved) {
      console.log("Error guardando");
      return;
    }
    this.navigate("/profiles");
  }

  render() {
    if (this.state.id) return this.renderDetail();
    return this.renderCreate();
  }
  renderDetail() {
    return <h1>Detalle del perfil {this.state.id}</h1>;
  }
  renderCreate() {
    return (
      <div>
        <Form onSubmit={this.save}>
          <Form.Group className="mb-3" controlId="form.identificator">
            <Form.Label>Identificador</Form.Label>
            <Form.Control
              type="text"
              placeholder="identificador cualquiera"
              onChange={this.changeForm("id")}
            />
            <Form.Text className="text-muted">
              Para identificar el perfil en el listado
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.resume">
            <Form.Label>Resumen del perfil</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={this.changeForm("resume")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.name">
            <Form.Label>Nombre y apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="ADAM ANDRES BELTRAN"
              onChange={this.changeForm("name")}
            />
            <Form.Text className="text-muted">
              Nombre con el que te has identificado en el servicio
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.dni">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              placeholder="19754004V"
              onChange={this.changeForm("dni")}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar <FaSave />
          </Button>
        </Form>
      </div>
    );
  }
}

function WithParams(props) {
  return (
    <ProfilePage {...props} params={useParams()} navigate={useNavigate()} />
  );
}

export default WithParams;
