import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const url = "http://localhost:4001/apic";

export default class GruposApp extends Component {

    state = {
        tipoModal: '',
        show: false,
        modalEliminar: false,
        form: {
            id_materia: "",
            strmateria: "",
            id_profesor: "",
            codmateria: "",
            permisos: [false, false, false, false, false, false, false, false, false, false, false]
        }, rows: '', fields: ''
    };



    handleChange = async (element, valor, posicion) => {
        let ajust = this.state.form;
        typeof valor == boolean ? ajust[element] = valor : ajust.permisos[posicion] = valor;
        this.setState({
            form: ajust
        });
    };


    showModal = () => {
        this.setState({ show: !this.state.show });
    };




    peticionGet = () => {
        axios.get(`${url}adminmaterias`)
            .then((response) =>
                this.setState({
                    rows: response.data.rows,
                    fields: response.data.fields
                }))
            .catch((error) => {
                console.log(error);
            });
    };



    peticionPost = async () => {
        await axios
            .post(`${url}adminmaterias`, this.state.form)
            .then((response) => {
                this.showModal();
                this.peticionGet();
            })
            .catch((error) => {
                console.log(error);
            });
    };



    peticionPut = () => {
        axios
            .put(`${url}adminmaterias/${this.state.form.id_materia}`, this.state.form)
            .then((response) => {
                this.showModal();
                this.peticionGet();
            })
            .catch((error) => {
                console.log(error);
            });
    };



    peticionDelete = () => {
        axios
            .delete(`${url}adminmaterias/${this.state.form.id_materia}`)
            .then((response) => {
                this.setState({ modalEliminar: false });
                this.peticionGet();
            })
            .catch((error) => {
                console.log(error);
            });
    };




    seleccionarMateria = (obj) => {
        let permisos = [obj.Primero, obj.Segundo, obj.Tercero, obj.Cuarto, obj.Quinto, obj.Sexto, obj.Septimo, obj.Octavo, obj.Noveno, obj.Decimo, obj.Once];

        this.setState(
            {
                tipoModal: "actualizar",
                form: {
                    id_materia: obj.id_materia,
                    strmateria: obj.strmateria,
                    id_profesor: obj.id_profesor,
                    codmateria: obj.codmateria,
                    permisos: permisos
                }
            });
    };


    componentDidMount() {
        this.peticionGet();
    }

    render() {

        const { form } = this.state;
        return (
            <>
                <table className="table">

                    <thead>
                        <h1 >Listado de Grupos</h1>
                        <tr>
                            {
                                this.state.fields.map((element) => {
                                    return <th>{element.name}</th>
                                })
                            }
                            <th> <Button
                                className="btn btn-success"
                                onClick={() => {
                                    this.setState({ form: "", tipoModal: "insertar" });

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
                                    {
                                        this.state.fields.map((element) => typeof data[element.name] == 'boolean' ? <td><input type="checkbox" disabled selected={data[element.name]} /></td> : <td>{data[element.name]}</td>)
                                    }
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                this.seleccionarmateria(data);
                                                this.showModal();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        {"   "}

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                this.seleccionarEstudiante(data);
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
                        <Modal.Title>Materia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Row>
                            <Form.Group as={Col} controlId="id_materia">
                                <Form.Label>Identificador</Form.Label>
                                <Form.Control
                                    type="text"
                                    minLength="7"
                                    maxLength="11"
                                    name="id_materia"
                                    disabled="true"
                                    placeholder="id_materia"
                                    onChange={() => this.handleChange("id_materia", value)}
                                    value={form.id_materia}
                                    required
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="strmateria">
                                <Form.Label>Materia</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="strmateria"
                                    placeholder="materia"
                                    onChange={() => this.handleChange('strmateria', value)}
                                    value={form.strmateria}
                                    required
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            {form.permisos.map((obj, index) => this.state.fields.filter((objs) => objs.dataTypeId.includes('bool')).map(objs => {
                                return (<>
                                    <Form.Group as={Col} controlId={objs.name}>
                                        <Form.Label>{objs.name}</Form.Label>
                                        <Form.Control
                                            type="checkbox"
                                            name={objs.name}
                                            selected={obj}
                                            onChange={() => this.handleChange(objs.name, obj, index)}
                                            required
                                        />
                                    </Form.Group>
                                </>)
                            })
                            )
                            }

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="codmateria">
                                <Form.Label>Código de materia</Form.Label>
                                <Form.Control
                                    type="text"
                                    minLength="5"
                                    maxLength="11"
                                    placeholder="código de la materia"
                                    name="codmateria"
                                    onChange={()=>this.handleChange('codmateria', form.codmateria)}
                                    value={form.codmateria}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="id_profesor">
                                <Form.Label>Código profesor</Form.Label>
                                <Form.Control
                                    type="text"
                                    minLength="5"
                                    maxLength="11"
                                    placeholder="id del profesor"
                                    name="id_profesor"
                                    onChange={()=>this.handleChange('id_profesor',form.id_profesor)}
                                    value={form.id_profesor}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.tipoModal === "insertar" ? (
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
                        Estás seguro que deseas eliminar esta materia
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