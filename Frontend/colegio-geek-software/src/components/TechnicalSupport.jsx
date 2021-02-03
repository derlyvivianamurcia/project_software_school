import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap';

export default class TechnicalSupport extends Component {
    render() {
        return (
            <>
                <Jumbotron>
                    <h1>Marketing stuff!</h1>
                    <p className="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.</p>
                    <p><Button variant="success link" size="lg">Get started today</Button> </p>
                </Jumbotron>
            </>
        )
    }
}