import React, { Component } from 'react'
import { Button, Col, Form, Modal, Table } from 'react-bootstrap'
import dataStudents from '../../data/students.json'
export default class StudentApp extends Component {
    constructor(props) {
        super()
        this.state = {
            showModal: false
        }
    }

    handleNewStudent = () => {
        this.setState({ showModal: true })
    }

    handleCloseNewStudent = () => {
        this.setState({ showModal: false })
    }

    render() {
        return (
            <div>
                <br /><Button variant="primary" onClick={this.handleNewStudent}>Nuevo Docente</Button><br /><br />
                <Modal
                    show={this.state.showModal}
                    onHide={this.handleCloseNewStudent}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >

                    <Modal.Header closeButton>
                        <Modal.Title>Nuevo Docente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id="frm-new-student">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Nombre *</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre completo" required ="required"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Correo *</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" required />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAddress1">
                                    <Form.Label>Documento *</Form.Label>
                                    <Form.Control type="text" minLength="7" maxLength="11" required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Colegio</Form.Label>
                                    <Form.Control as="select" defaultValue="Choose..." required>
                                        <option>Choose...</option>
                                        <option >Colegios Las Nieves</option>
                                        <option >Colegios Las Nieves</option>
                                        <option >Institución Educativa Republica de Uruguay</option>
                                        <option >Institución Educativa Javiera Londoño</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTelephono">
                                    <Form.Label>Teléfon *</Form.Label>
                                    <Form.Control type="text" minLength="5" maxLength="11" required />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridTelephono">
                                    <Form.Label>Fecha de nacimiento *</Form.Label>
                                    <Form.Control type="date" required />
                                </Form.Group>
                            </Form.Row>

                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseNewStudent}>
                            Cerrar
                    </Button>
                        <Button variant="primary" type="submit">Guardar</Button>
                    </Modal.Footer>
                </Modal>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Colegio</th>
                            <th>Fecha de nacimiento</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataStudents.map((student, index) => {
                            return <tr key={index}>
                                <td>{student.id}</td>
                                <td>{student.documento}</td>
                                <td>{student.nombre}</td>
                                <td>{student.colegio}</td>
                                <td>{student.fecha_nacimiento}</td>
                                <td>{student.telefono}</td>
                                <td>{student.correo}</td>
                            </tr>
                        })}


                    </tbody>
                </Table>
            </div>
        )
    }
}
