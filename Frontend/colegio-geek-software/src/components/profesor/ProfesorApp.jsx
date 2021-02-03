import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form, Col } from "react-bootstrap";

const url = 'http://localhost:4001/api/'

export default class ProfesorApp extends Component {

  state = {
    actores: [],
    show: false, 
    modalEliminar: false, 
    form: {
      documento: "",
      tipo_documento: "",
      nombres: "",
      apellidos: "",
      correo: "",
      numero_expediente: "",
      genero: "",
      institucion_id: "",
      telefono_celular: "",
      tipoModal: "" 
    },
    idEstudiante: "" 
  
  };


  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  };

  showModal = () => {
    this.setState({ show: !this.state.show });
  };



  seleccionarEstudiante = (estudianteMod) => {
    const estudiante = this.state.actores.find(
      (result) => result.id === estudianteMod
    );

    
    this.setState({
      idEstudiante: estudiante.id,
      tipoModal: "actualizar",
      form: {
        documento: estudiante.documento,
        tipo_documento: estudiante.tipo_documento,
        nombres: estudiante.nombres,
        apellidos: estudiante.apellidos,
        correo: estudiante.correo,
        numero_expediente: estudiante.numero_expediente,
        genero: estudiante.genero,
        institucion_id: estudiante.institucion_id,
        telefono_celular: estudiante.telefono_celular
      }
    });
  };

  componentDidMount() {
  }

  render() {
    const { form } = this.state;
    return (
      <>
        {/*INICIO Tabla*/}
        <h1>Listado de estudiantes</h1>

        <Button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: "", tipoModal: "insertar" });
            this.showModal();
          }}
        >
          Nuevo Estudiante
        </Button>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Colegio</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {this.state.actores.map((data) => {
              return (
                <tr >
                  <td>{data.id}</td>
                  <td>{data.documento}</td>
                  <td>{data.nombres}</td>
                  <td>{data.telefono_celular}</td>
                  <td>{data.correo}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.seleccionarEstudiante(data.id);
                        this.showModal();
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    {"   "}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.seleccionarEstudiante(data.id);
                        this.setState({ modalEliminar: true });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/*Fin Tabla*/}

        {/*Modal del formulario */}

        <Modal show={this.state.show} animation={false}>
          <Modal.Header>
            <Modal.Title>Nuevo estudiante</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="nombres">
                <Form.Label>Nombre(s) *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre(s) completo(s)"
                  name="nombres"
                  required="required"
                  onChange={this.handleChange}
                  value={form ? form.nombres : ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="apellidos">
                <Form.Label>Apellido(s)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apellidos completo"
                  name="apellidos"
                  onChange={this.handleChange}
                  value={form ? form.apellidos : ""}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="documento">
                <Form.Label>Documento *</Form.Label>
                <Form.Control
                  type="text"
                  minLength="7"
                  maxLength="11"
                  name="documento"
                  placeholder="Documento de identidad"
                  onChange={this.handleChange}
                  value={form ? form.documento : ""}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="correo">
                <Form.Label>Correo *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite el correo"
                  name="correo"
                  onChange={this.handleChange}
                  value={form ? form.correo : ""}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="numero_expediente">
                <Form.Label>Expediente (*)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="EXP-3902993-P90"
                  name="numero_expediente"
                  required="required"
                  onChange={this.handleChange}
                  value={form ? form.numero_expediente : ""}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="tipo_documento">
                <Form.Label>Tipo de Documento (*)</Form.Label>
                <Form.Control
                  as="select"
                  name="tipo_documento"
                  onChange={this.handleChange}
                  value={form ? form.tipo_documento : ""}
                  required
                >
                  <option value="">seleccione...</option>
                  <option value="CC">CC</option>
                  <option value="TI">TI</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="genero">
                <Form.Label>Genero (*)</Form.Label>
                <Form.Control
                  as="select"
                  name="genero"
                  onChange={this.handleChange}
                  value={form ? form.genero : ""}
                  required
                >
                  <option value="" style={{ display: "none" }}>
                    Seleccionar...
                  </option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="institucion_id">
                <Form.Label>Institución Educativa (*)</Form.Label>
                <Form.Control
                  as="select"
                  name="institucion_id"
                  onChange={this.handleChange}
                  value={form ? form.institucion_id : ""}
                  required
                >
                  <option value="0">Choose...</option>
                  <option value="1">IJFR</option>
                  <option value="2">HAG</option>
                  <option value="3">FO</option>
                  <option value="3">JAYG</option>
                  <option value="3">SO</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="telefono_celular">
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  type="text"
                  minLength="5"
                  maxLength="11"
                  placeholder="Número celular"
                  name="telefono_celular"
                  onChange={this.handleChange}
                  value={form ? form.telefono_celular : ""}
                />
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            {this.state.tipoModal === "insertar" ? (
                      <button
                className="btn btn-success"
              >
                Insertar
              </button>
            ) : (
              <button
                className="btn btn-primary"
              >
                Actualizar
              </button>
            )}
            <button className="btn btn-danger" onClick={() => this.showModal()}>
              Cancelar
            </button>
          </Modal.Footer>
        </Modal>
        {/* Fin Modal del formulario */}

        {/* Inicio Modal del Botón Eliminar */}

        <Modal show={this.state.modalEliminar}>
          <Modal.Body>
            Estás seguro que deseas eliminar a la empresa {form && form.nombre}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger"
         
            >
              Sí
            </button>
            <button
              className="btn btn-secundary"
              onClick={() => this.setState({ modalEliminar: false })}
            >
              No
            </button>
          </Modal.Footer>
        </Modal>

        {/* Fin Modal del Botón Eliminar */}
      </>
    );
  }
}
