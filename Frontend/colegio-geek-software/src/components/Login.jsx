import React, { Component } from 'react';
import {CONTRASENA_USUARIO,CUENTA_USUARIO, ID_USUARIO, APELLIDO_USUARIO, NOMBRE_CUENTA_USUARIO, NOMBRE_USUARIO} from '../constantes'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications'
import {Link} from 'react-router-dom'
import logo from '../images/logoMTApp.png'
import Loader from './Loader';

export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            cargando : false,
            recordar : false,
            correo : null,
            contrasena : null
        }
    }

    componentDidMount(){
        if(localStorage.getItem("usuario") != null){
            let usuario = JSON.parse(localStorage.getItem("usuario"))
            if(usuario.correo === CUENTA_USUARIO){
                this.props.history.push('/inicio')
            }
        }
    }

    cambioEntradaCampo = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });        
    }

    iniciarSesion = (e) =>  {
        e.preventDefault()

        this.setState({ cargando: true })
        
        setTimeout( () => {
            if(this.state.correo === CUENTA_USUARIO && this.state.contrasena === CONTRASENA_USUARIO){
                const rand=()=>Math.random(0).toString(36).substr(2);
                const token=(length)=>(rand()+rand()+rand()+rand()).substr(0,length);
                localStorage.setItem("usuario", JSON.stringify({
                        idUsuario : ID_USUARIO,
                        nombreUsuario : NOMBRE_CUENTA_USUARIO,
                        nombre : NOMBRE_USUARIO,
                        correo : CUENTA_USUARIO,
                        apellido : APELLIDO_USUARIO,
                        token : token
                    })
                )
                this.props.history.push('/inicio')
            }else{
                this.setState({ cargando: false })
                NotificationManager.error('Error en el inicio de sesión', 'Error', 2000);
            }
        }, 1000) 
    }

    render() {
        return (
            <Container className="d-flex align-items-center flex-column">
                <Card bg="light" text="dark" className="col-12 col-lg-5 login-card mt-5 hv-center">
                    <Row className="align-items-center flex-column mt-4">
                        <Col xs={6} md={4}>
                            <Image src="https://quantitas.net/sites/default/files/00%20-%20Colegio.png" fluid />
                        </Col>
                    </Row>
                    <Card.Body>
                        <Form onSubmit={this.iniciarSesion}>
                            <Form.Group controlId="correo">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" placeholder="Ingrese el correo" name="correo" onChange={this.cambioEntradaCampo} required/>
                                <Form.Text className="text-muted">Ingrese su correo institucional</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="contrasena">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Contraseña" name="contrasena" onChange={this.cambioEntradaCampo} required/>
                                <Link to="/recuperar-contrasena" className="btn btn-link">¿Has olvidado tu contraseña?</Link>
                            </Form.Group>
                            <Form.Group controlId="recordar">
                                <Form.Check type="checkbox" label="Recordar" name="recordar" onChange={this.cambioEntradaCampo}/>
                            </Form.Group>
                            <Row>
                                <Col className="align-items-center flex-column">
                                    <Button variant="primary" type="submit">Iniciar</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
                <NotificationContainer/>
                <Loader visible={this.state.cargando} />
            </Container>
        );
    }
}