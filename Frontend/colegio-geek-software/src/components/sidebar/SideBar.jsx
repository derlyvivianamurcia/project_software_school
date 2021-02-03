import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./SubMenu";
import { Nav, Image } from "react-bootstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

class SideBar extends React.Component {
  render() {
    return (
      <div className={classNames("sidebar", { "is-open": this.props.isOpen })}>
        <div className="sidebar-header justify-content-center text-center">
          <Image src="https://quantitas.net/sites/default/files/00%20-%20Colegio.png" fluid style = {{width:'70%'}}/>
        </div>

        <Nav className="flex-column pt-2">
          <p className="ml-3">Menú</p>
          <Nav.Item className="active">
            <Link to="/inicio" className="nav-link">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Inicio
            </Link>
          </Nav.Item>

          <SubMenu
            title="Docente"
            icon={faCopy}
            items={[
              {text : "Grupos", link:'/estudiantes/listado'}, 
              {text : "Notas", link: '/docente'}, 
              {text : "Plan de estudio", link:""}, 
              {text : "Perfil", link : ""}
            ]}
          />

          <Nav.Item>
            <Link to="/modulos" className="nav-link">
              <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
              Estudiante
            </Link>
          </Nav.Item>

     

          <Nav.Item>
            <Link to="/ayuda" className="nav-link">
              <FontAwesomeIcon icon={faQuestion} className="mr-2" />
              Ayuda
            </Link>
          </Nav.Item>

          <Nav.Item>
            <Link to="/soporte-tecnico" className="nav-link">
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
              Soporte técnico
            </Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default SideBar;
