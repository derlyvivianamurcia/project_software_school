import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Bar from "../Bar";

const url = "http://localhost:4001/api/"

export default class GruposApp extends Component {
  // los estados esta el formulario, modaleliminar, 
  state = {
    grupo: [],
    show: false, 
    modalEliminar: false, 
    form: {
      id: "",
      grado: "",
      id_profesor: "",
      cod_grupo: "",
      tipoModal: "" //Selecciona si vamos a hacer un Post o un PUT dependiendo del boton que se oprima
    },
    id_grupo: "" //Me permite identificar que estudiante voy a actualizar o eliminar
  
  };

  //1 para manejar los cambios del formulario
// lee todo que tiene los campos
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

  //2Mostrar y ocultar el modal
//se niega el estado si doy clic y cuando esta en true entonces  va estar en fol
  showModal = () => {
    this.setState({ show: !this.state.show });
  };

  //3Petición GET a la API
// va a ir a la api/estudiante
// utilizando fecht se tiene que convertir a un json para obtener los datos 
//mejor momento component
  peticionGet = () => {
    fetch(`${url}grupo`)
      .then((response) => response.json())
      .then((grupo) => this.setState({ grupo: grupo }))
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Petición POST a la API

  peticionPost = async () => {
    await axios
      .post(`${url}grupo`, this.state.form)
      .then((response) => {
        this.showModal();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Petición PUT a la API
// debo llamar algo que me seleccione el estudiante selecciona estudiante
  peticionPut = () => {
    axios
      .put(`${url}grupo/${this.state.id_grupo}`, this.state.form)
      .then((response) => {
        this.showModal(); //cierre el modal
        this.peticionGet(); //haga lo peticion get para que tenga los datos actualizados 
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Petición DELETE a la API

  peticionDelete = () => {
    axios
      .delete(`${url}grupo/${this.state.id_grupo}`, this.state.form)
      .then((response) => {
        this.setState({ modalEliminar: false }); // cambia el modal eliminar porque no tengo showmodal modal eliminar lo controlo con el estado 
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //Busca el estudiante que va a editar o eliminar y trae los datos
  // y los pinta en el formulario cuando se selecciona actualizar

  seleccionarEstudiante = (estudianteMod) => {
    //Encuentra el id del estudiante selccionado
  /*   console.log(estudianteMod); */
    const grupo = this.state.grupo.find(
      (result) => result.id === estudianteMod
    );
//no capturo el id del formulario,.faind, ud tiene un estudiante para modificar entonces vaya y compruebe si coinicide con el resultado ue ud tiene

    //Pinta en el formulario los datos que tiene del usuario almacenados
    //en el estado
    this.setState({
      //id estudiante modifique por este dato
//modifico el estado //cuando lo tenga en el estado voy a la peticion y pongo ese id que esta en el estado y carge los datos en el estado 

      id_grupo: grupo.id,
      tipoModal: "actualizar",
      form: {
      
        grado: grupo.grado,
        año: grupo.año,
        cod_grupo: grupo.cod_grupo,
        id_profesor: grupo.id_profesor,
      }
    });
  };

  //4Mejor sitio para hacer las peticiones
  componentDidMount() {
    this.peticionGet();
  }

  render() {
    //Destructuring para no escribir this.state.form...
    const { form } = this.state;
    return (
      <>
      
        {/*INICIO Tabla*/}
      
       

     
        <table className="table">
      
          <thead>
              <Bar/>
          <h1 >Listado de Grupos</h1>
            <tr>
              <th>#</th>
              <th>Año</th>
              <th>Grado</th>
               <th>Cód. Grupo</th>
              <th>Ident. Profesor</th>
              <th>Accion</th>
                      
             <th> <Button
          className="btn btn-success"
          onClick={() => {
            this.setState({ form: "", tipoModal: "insertar" });
            // cuando el formularilo esta vacio debeia ser insertar//tipo modal
            this.showModal();
          }}
        >
          Nuevo Grupo
        </Button></th>
            </tr>
          </thead>
          <tbody>
            {this.state.grupo.map((data) => {
              return (
                <tr >
                  <td>{data.id_grupo}</td>
                  <td>{data.año}</td>
                  <td>{data.grado}</td>
                  <td>{data.cod_grupo}</td>
                  <td>{data.id_profesor}</td>
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
          <Link to="/" class="d">
          <input type="submit" value="Inicio" className="btn btn-primary" />
        </Link>
        </table>

        {/*Fin Tabla*/}

        {/*Modal del formulario */}

        <Modal show={this.state.show} animation={false}>
          <Modal.Header>
            <Modal.Title>Nuevo Grupo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
            <Form.Row>
              <Form.Group as={Col} controlId="documento">
                <Form.Label>Identificador *</Form.Label>
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

              <Form.Group as={Col} controlId="año">
                <Form.Label>Año *</Form.Label>
                <Form.Control
                  type="text"
                  minLength="7"
                  maxLength="11"
                  name="año"
                  placeholder="Año"
                  onChange={this.handleChange}
                  value={form ? form.año : ""}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
            
            <Form.Group as={Col} controlId="grupo">
                <Form.Label>Grupo *</Form.Label>
                <Form.Control
                  type="text"
                  minLength="7"
                  maxLength="11"
                  name="grupo"
                  placeholder="Grupo"
                  onChange={this.handleChange}
                  value={form ? form.grupo : ""}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="cod_grupo">
                <Form.Label>Código de grupo</Form.Label>
                <Form.Control
                  type="text"
                  minLength="5"
                  maxLength="11"
                  placeholder="código del grupo"
                  name="cod_grupo"
                  //si el formulario tiene valores pongan o ponga vacio sino
                  onChange={this.handleChange}
                  value={form ? form.cod_grupo : ""}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="cod_grupo">
                <Form.Label>Código profesor</Form.Label>
                <Form.Control
                  type="text"
                  minLength="5"
                  maxLength="11"
                  placeholder="código del grupo"
                  name="cod_grupo"
                  //si el formulario tiene valores pongan o ponga vacio sino
                  onChange={this.handleChange}
                  value={form ? form.cod_grupo : ""}
                />
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            {this.state.tipoModal === "insertar" ? (
              //se pregunta, que esta haciendo insertando, borra y queda en blanco 

              // ?(es un if)el tipo modal esta en insertar entonces a este boton demos insertar 

              //dentro del mmismo modal 
              <button
                className="btn btn-success"
                onClick={() => this.peticionPost()}
              >
                Insertar
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => this.peticionPut()}
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
            Estás seguro que deseas eliminar  {form && form.nombre}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger"
              onClick={() => this.peticionDelete()}
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