import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaRandom, FaSave, FaTrash } from "react-icons/fa";
import ProfileService from "./profile.service";
import Profile from "../../classes/profile";
import RandomDni from "../../services/random-dni";
import InputGroup from "react-bootstrap/InputGroup";
import "./profile.css";
import { Row, Col, Container } from "react-bootstrap";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.service = new ProfileService();
    this.dniService = new RandomDni("", 8);
    this.state = { id: undefined, form: new Profile() };
    this.saving = false;
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.randomDni = this.randomDni.bind(this);
  }

  componentDidMount() {
    const id = this.props.params.id;
    this.setState({ id });
    this.navigate = this.props.navigate;
    if (id) this.loadData(id);
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

  async loadData(id) {
    const data = await this.service.load(id);
    this.setState({ ...this.state, form: data });
  }

  async save(event) {
    this.saving = true;
    event.preventDefault();
    const saved = await this.service.save(this.state.form);
    if (!saved) {
      console.log("Error creando");
      this.saving = false;
      return;
    }
    this.navigate("/profiles");
    this.saving = false;
  }

  async update(event) {
    this.saving = true;
    event.preventDefault();
    const saved = await this.service.update(this.state.form, this.state.id);
    if (!saved) {
      console.log("Error actualizando");
      this.saving = false;
      return;
    }
    this.navigate("/profiles");
    this.saving = false;
  }

  async delete() {
    this.saving = true;
    const saved = await this.service.delete(this.state.id);
    if (!saved) {
      console.log("Error borrando");
      this.saving = false;
      return;
    }
    this.navigate("/profiles");
    this.saving = false;
  }

  randomDni() {
    const dni = this.dniService.generate();
    this.setState({
      ...this.state,
      form: { ...this.state.form, ...{ dni } },
    });
  }

  render() {
    if (this.state.id) return this.renderDetail();
    return this.renderCreate();
  }

  renderCreate() {
    return (
      <div>
        <h1>Creando</h1>
        <Form onSubmit={this.save}>
          <Form.Group className="mb-3" controlId="form.identificator">
            <Form.Label>Identificador</Form.Label>
            <Form.Control
              type="text"
              placeholder="identificador cualquiera"
              onChange={this.changeForm("id")}
              value={this.state.form.id}
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
              value={this.state.form.resume}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.name">
            <Form.Label>Nombre y apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="ADAM ANDRES BELTRAN"
              onChange={this.changeForm("name")}
              value={this.state.form.name}
            />
            <Form.Text className="text-muted">
              Nombre con el que te has identificado en el servicio
            </Form.Text>
          </Form.Group>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="00000000A"
              onChange={this.changeForm("dni")}
              value={this.state.form.dni}
            />
            <InputGroup.Text id="random_dni" onClick={this.randomDni}>
              <FaRandom />
            </InputGroup.Text>
          </InputGroup>
          <Container>
            <Row>
              <Col>
                <Button variant="primary" type="submit">
                  Crear <FaSave />
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    );
  }

  renderDetail() {
    return (
      <div>
        <h1>{this.state.form.name}</h1>
        <Form onSubmit={this.update}>
          <Form.Group className="mb-3" controlId="form.identificator">
            <Form.Label>Identificador</Form.Label>
            <Form.Control
              type="text"
              placeholder="identificador cualquiera"
              onChange={this.changeForm("id")}
              value={this.state.form.id}
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
              value={this.state.form.resume}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.name">
            <Form.Label>Nombre y apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="ADAM ANDRES BELTRAN"
              onChange={this.changeForm("name")}
              value={this.state.form.name}
            />
            <Form.Text className="text-muted">
              Nombre con el que te has identificado en el servicio
            </Form.Text>
          </Form.Group>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="19754004V"
              onChange={this.changeForm("dni")}
              value={this.state.form.dni}
            />
            <InputGroup.Text id="random_dni" onClick={this.randomDni}>
              <FaRandom />
            </InputGroup.Text>
          </InputGroup>
          <Container>
            <Row>
              <Col>
                <Button variant="primary" type="submit">
                  Guardar <FaSave />
                </Button>
              </Col>
              <Col>
                <Button variant="danger" onClick={this.delete}>
                  Eliminar <FaTrash />
                </Button>
              </Col>
            </Row>
          </Container>
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
