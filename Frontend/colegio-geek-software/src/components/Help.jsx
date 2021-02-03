import React, { Component } from 'react'
import { Card, Nav, Tab } from 'react-bootstrap'
import ContactUs from './ContactUs'

export default class Help extends Component {
    render() {
        return (
            <>
                <Tab.Container id="tabs-help" defaultActiveKey="help-manual">
                    <Card>
                    <Card.Header>
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link eventKey="help-manual">Manual de ayuda</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="technical-manual">Manual Técnico</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="contact-us">Contactanos</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey="help-manual">
                                <iframe title="Manual de ayuda" src="https://drive.google.com/file/d/1WMrd9HZ1suomJDZCOdh465tAFgXCkYYz/preview" style={{width: "100%", height:400}}></iframe>
                            </Tab.Pane>
                            <Tab.Pane eventKey="technical-manual">
                                <iframe title="Manual Tecnico" src="https://drive.google.com/file/d/1DimzQI8jSTMoFeygyB41UleNk9Xhhjgk/preview" style={{width: "100%", height:400}}></iframe>
                            </Tab.Pane>
                            <Tab.Pane eventKey="contact-us">
                                <ContactUs/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Card.Body>
                    </Card>
                </Tab.Container>

            </>
        )
    }
}
