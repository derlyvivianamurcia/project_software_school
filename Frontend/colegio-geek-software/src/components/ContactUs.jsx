import React, { Component } from 'react'
import { Col, Row, Form, Card, InputGroup, FormControl, Button } from 'react-bootstrap'

export default class ContactUs extends Component {
    render() {
        return (
            <>
                <Row className="justify-content-center">
                    <Col md={8} lg={10} className="col-12 pb-5 mt-3">
                        <Form action="mail.php" method="post">
                            <Card className="border-primary rounded-0">
                                <Card.Header className="p-0">
                                    <div className="bg-info text-white text-center py-2">
                                        <h3><i className="fa fa-envelope"></i> Contactanos</h3>
                                        <p className="m-0">Con gusto te ayudaremos</p>
                                    </div>
                                </Card.Header>
                                <Card.Body className="p-3">
                                    <Form.Group>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><i className="fa fa-user text-info"></i></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl placeholder="Nombre y Apellido" type="text" name="correo" required />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><i className="fa fa-envelope text-info"></i></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl type="email" placeholder="ejemplo@gmail.com" name="email" required />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><i className="fa fa-comment text-info"></i></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl as="textarea" placeholder="Envianos tu Mensaje" name="comentario" required />
                                        </InputGroup>
                                    </Form.Group>

                                    <Row>
                                        <Col className="align-items-center flex-column">
                                            <Button variant="primary" type="submit" className="btn btn-info btn-block rounded-0 py-2">Enviar</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </>
        )
    }
}
