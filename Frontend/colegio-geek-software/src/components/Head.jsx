import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Head extends Component {
    render() {
        console.log()
        return (
            <>
                <h3 className="text-muted">Project name</h3>
                <Navbar className="">
                    <Nav as="ul" className="nav nav-justified">
                        <Nav.Item as="li" className={this.props.App.state.menu_option==="home"?"active":""}>
                            <Link to="/home" className="nav-link">Home</Link>
                        </Nav.Item>
                        <Nav.Item as="li" className={this.props.App.state.menu_option==="projects"?"active":""}>
                            <Link to="/projects" className="nav-link">Projects</Link>
                        </Nav.Item>
                        <Nav.Item as="li" className={this.props.App.state.menu_option==="services"?"active":""}>
                            <Link className="nav-link" to="/services">Services</Link>
                        </Nav.Item>
                        <Nav.Item as="li" className={this.props.App.state.menu_option==="downloads"?"active":""}>
                            <Link className="nav-link" to="/downloads">Downloads</Link>
                        </Nav.Item>
                        <Nav.Item as="li" className={this.props.App.state.menu_option==="about"?"active":""}>
                            <Link className="nav-link" to="/about">About </Link>
                        </Nav.Item>
                        <Nav.Item as="li" className={this.props.App.state.menu_option==="contact"?"active":""}>
                            <Link to="/contact" className="nav-link">Contact</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </>
        )
    }
}