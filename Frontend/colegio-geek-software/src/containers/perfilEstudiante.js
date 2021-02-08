import React, {Component} from 'react';

function perfilEstudiante (data){
  
    return (        
        <div className="container">
            <div className="container">
                <div className="row">
                <div className="col-md-12">
                    <div className="card">
                            <h3 className="card-header">Perfil</h3>
                            <div className="card-body">
                                <h5 className="card-title">Nombres y apellidos</h5>
                            </div>
                            <div className="card-body">
                                <img src="../img/foto.png" className="d-block user-select-none"></img>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">ID</li>
                                <li className="list-group-item">Grupo</li>
                                <li className="list-group-item">Contraseña</li>
                                <li className="list-group-item">Estado</li>
                                <li className="list-group-item">Nota promedio</li>
                            </ul>
                        </div>
                    </div>
                </div>   
            </div>
        </div>
    );
};


export default perfilEstudiante;
