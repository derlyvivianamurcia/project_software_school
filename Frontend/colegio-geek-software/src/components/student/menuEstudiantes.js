import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios'
import PerfilEstudiante from '.../containers/PerfilEstudiante';
import NotasEstudiante from '.../containers/notas';
import React, {Component} from 'react';

class menuEstudiantes extends Component{

    constructor(props) {
        super(props);

        this.state = {
            id : '',    
        };
    };

    async componentDidMount(){ 
        const res = await axios.get(`http://localhost:5058/reportenotasxalumno/${2}`);
        this.setState({id : res.data});
        console.log(res.data);                
    };   
    
render() {   
    return (
        <Router>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">

                        <div className="card mb-3 mr-3">                      
                            <h3 className="card-header">Perfil </h3>
                                <div className="card-body">
                                    <img src="../img/profile.png"></img>
                                </div> 
                                <div className="card-body">
                                    <Link to ="/perfil" className="btn btn-primary btn-block">Perfil</Link>
                                </div>                          
                        </div>
                        <div className="card mb-3 mr-3">
                            <h3 className="card-header">Notas </h3>
                                <div className="card-body">
                                    <img src="../img/report.png"></img>
                                </div> 
                                <div className="card-body">
                                        <Link to ="/notas" className="btn btn-primary btn-block">Notas</Link>
                                </div>
                        </div> 
                    </div>
                    <div className="col-md-9">   
                    <Switch>
                        <Route path="/perfil">
                            <PerfilEstudiante/>                        
                        </Route>
                        <Route path="/notas">
                            <NotasEstudiante 
                            notas={this.state.notas}
                            />                   
                        </Route> 
                    </Switch>
                    </div>                          
                </div>            
            </div>            
        </Router>
    );
};    
};
export default menuEstudiantes;