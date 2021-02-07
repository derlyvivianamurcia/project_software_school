import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faAlignLeft, faUserAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

class Bar extends React.Component {
  constructor(props) {
    super();

  }

  logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('usuario');
    this.props.history.push('/iniciar-sesion')
  }

  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="shadow-sm mb-2 bg-white rounded">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Button variant="outline-info" onClick={this.props.toggle}>
                <FontAwesomeIcon icon={faAlignLeft} />
              </Button>
              <Link to="/inicio" className="nav-link">Inicio</Link>
              <Link to="/contactanos" className="nav-link">Contactenos</Link>

              <div id="drop-user-menu">
              <NavDropdown alignRight title={<img src="https://image.flaticon.com/icons/png/512/16/16363.png" alt="Avatar" width="40" height="40" className="rounded-circle"/>} >
                <Link to="/usuario/perfil" className="dropdown-item"><FontAwesomeIcon icon={faUserAlt} className="mr-2" />Perfil</Link>
                <Link to="/usuario/perfil" className="dropdown-item"><FontAwesomeIcon icon={faUserCircle} className="mr-2" />Cuenta</Link> 
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />Salir</NavDropdown.Item>
              </NavDropdown>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
export default Bar;