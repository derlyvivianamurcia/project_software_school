import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap'

export default class Services extends Component {
    constructor(props) {
        super()
        props.App.setState({ menu_option: "services" })
    }
    render() {
        return (
            <>
                <Row>
                    <Col>
                        <h2>Services</h2>
                    </Col>
                </Row>
            </>
        );
    }
}