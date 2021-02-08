import React, {Component} from 'react';

function notasEstudiante (notas){
  
    return (        
        <div className="container">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id nota</th>
                            <th>Valor</th>
                            <th>Componente</th>
                            <th>Id materia</th>
                            <th>N° de matricula</th>                                                   
                        </tr>
                    </thead>                       
                    <tbody>
                                      
     
                      
                    </tbody>
                </table>
                    </div>
                </div>   
            </div>
        </div>
    );
};

export default notasEstudiante;