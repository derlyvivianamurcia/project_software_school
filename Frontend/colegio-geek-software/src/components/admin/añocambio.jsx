import React, { Component } from 'react'
import { Accordion, Card, Col, Row } from 'react-bootstrap'
import Axios from "axios";
let ruta = 'http://localhost:4001/apic'
class añocambio extends Component {
   
    cambiar= async()=>{
        Axios.put(ruta+'/cambioaño').then(()=>
            document.getElementById('elementodeemergencia').innerHTML= 'se cambio el año'
        );

    }

    render() {
        return (
            <>
                <Row>
                    <Col lg={6} className="mb-5">
                        <Accordion defaultActiveKey="0">
                            <Card bg="primary">
                                <Accordion.Toggle as={Card.Header}  onClick={this.cambiar} eventKey="0" role="button" aria-expanded="true" className="btn btn-primary py-2 shadow-sm with-chevron">
                                    <p className="d-flex align-items-center justify-content-between mb-0 px-3 py-2"><strong className="text-uppercase">Cambiar año</strong><i className="fa fa-angle-down"></i></p>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0" className="shadow-sm">
                                    <Card.Body>
                                        <p className="font-italic mb-0 text-white" id='elementodeemergencia' >Espere un momento mientras se ejecuta su peticion.</p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
            </>
        );
    }
}

export default añocambio;