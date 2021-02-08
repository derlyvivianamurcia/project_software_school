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
import Axios from "axios";
let ruta ='http://localhost:4001/'
class SideBar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      cuenta:39,
      cuenta2:{}
    };
  }
  componentDidMount() {
    Axios.get(ruta+'apic/cuentas/'+this.state.cuenta).then(res=>{
      this.setState({cuenta2:res.data.rows});
    }).catch(err=>{
      console.log(err);
    });;
  }
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
              {text : "Grupos", link:'/grupos'}, 
              {text : "Notas", link: '/notas'}, 
              {text : "Plan de estudio", link:"/plan"}, 
            ]}
          />
          {this.state.cuenta2[0]?.tipo_cuenta==3?<SubMenu
            title="Administrador"
            icon={faCopy}
            items={[
              {text : "Materias", link:'/materias'}, 
              {text : "Reportes", link: '/reportes'}, 
              {text : "Cambio de año", link:"/cambiodeaño"} 
            ]}
          />
          :''}
          
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
