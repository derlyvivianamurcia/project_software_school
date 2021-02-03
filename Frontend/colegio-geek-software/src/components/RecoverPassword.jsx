import React, { Component } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { CONTRASENA_USUARIO, CUENTA_USUARIO } from '../constantes'
import Dialog from 'react-bootstrap-dialog'
import Loader from './Loader'

export default class RecoverPassword extends Component {

    constructor() {
        super()
        this.state = {
            cargando: false
        }
    }
    obtenerCredenciales = e => {
        e.preventDefault()

        this.setState({ cargando: true })
        setTimeout(() => {
            this.setState({ cargando: false })
            this.dialog.show({
                title: 'Credenciales',
                body: <>
                    <b>Cuenta: </b> {CUENTA_USUARIO}<br />
                    <b>Contraseña: </b> {CONTRASENA_USUARIO}
                </>,
                actions: [
                    Dialog.OKAction((dialog) => {
                        dialog.hide()
                        this.props.history.push('/iniciar-sesion')
                    })
                ],
                bsSize: 'small',
                onHide: (dialog) => {
                    dialog.hide()
                }
            })
        }, 2000)
    }


    render() {
        return (
            <Container className="padding-bottom-3x mb-2 mt-5">
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        <div className="forgot">
                            <h2>¿Olvidaste tu contraseña?</h2>
                            <p>Cambie su contraseña en tres sencillos pasos. ¡Esto le ayudará a proteger su contraseña!</p>
                            <ol className="list-unstyled">
                                <li><span className="text-primary text-medium">1. </span>Ingrese su dirección de correo electrónico a continuación.</li>
                                <li><span className="text-primary text-medium">2. </span>Nuestro sistema le enviará un enlace temporal</li>
                                <li><span className="text-primary text-medium">3. </span>Utilice el enlace para restablecer su contraseña</li>
                            </ol>
                        </div>
                        <Form onSubmit={this.obtenerCredenciales}>
                            <Card className="mt-4">
                                <Card.Body>
                                    <Form.Group controlId="correo">
                                        <Form.Label>Ingrese su dirección de correo electrónico</Form.Label>
                                        <Form.Control type="email" required />
                                        <Form.Text className="text-muted" />
                                        <small className="form-text text-muted">Ingrese la dirección de correo electrónico que utilizó durante el registro en Media Técnica App. Luego, enviaremos un enlace a esta dirección por correo electrónico.</small>
                                    </Form.Group>
                                </Card.Body>
                                <Card.Footer>
                                    <Button type="submit" variant="success" className="mr-2">Obtener nueva contraseña</Button>
                                    <Button variant="danger" onClick={() => { this.props.history.push('/iniciar-sesion'); }}>Atrás para iniciar sesión</Button>
                                </Card.Footer>
                            </Card>
                        </Form>
                    </Col>
                </Row>
                <Dialog ref={(component) => { this.dialog = component }} />
                <Loader visible={this.state.cargando} />
            </Container>


        )
    }
}
