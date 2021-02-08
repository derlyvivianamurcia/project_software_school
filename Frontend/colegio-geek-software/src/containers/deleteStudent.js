import React, {Component} from 'react';
import axios from 'axios';

class DeleteStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_student : "",
            student : [],
        };
    };

    onSubmitDelete = async e => {
        await axios.delete(`http://localhost:5058/estudiantes/${this.state.id_student}`, {        
            
        });
    };

    onSubmiSearch = async e => {
        e.preventDefault();
        const res = await axios.get(`http://localhost:5058/estudiantes/${this.state.id_student}`); 
        this.setState({student : res.data[0]});
    };

    render() {
        return (
            <div className="container mt-5 ">
                <div className="card">               
                    <div className="card-body">
                        <h1 className="text-center"> Delete students </h1>
                        <br/>
                        <div className="form-group">
                            <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmiSearch}>
                                <input
                                type="text" 
                                placeholder="id student" 
                                className="form-control mr-sm-2 "
                                onChange={(e) => {this.setState({id_student : e.target.value})}}/>
                                <button type="submit" className="btn btn-info my-2 my-sm-0">Search</button>
                            </form>    
                        </div>
                    </div>                
                
                <div className="card-body">
                    <form onSubmit={this.onSubmitDelete}>
                        <br/>                        
                        <div className="form-group">
                            <label>Aprobado</label>
                                <input
                                    value= {this.state.student.aprobado}
                                    type="text"                          
                                    className="form-control"
                                    disabled
                                />
                        </div>
                        <div className="form-group">
                            <label> Grupo</label>
                                <input 
                                    value={this.state.student.grupo}
                                    type="text"
                                    className="form-control"
                                    disabled
                                />
                        </div>                        
                        <div className="form-group">
                            <label>Id cuenta</label>
                            <input 
                                value= {this.state.student.id_cuenta}
                                type="text"
                                className="form-control"
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>N° matricula</label>
                                <input
                                    value= {this.state.student.nro_matricula}
                                    type="text"
                                    className="form-control"
                                    disabled                                    
                                />
                        </div>                   
                        <div className="form-group">
                            <label>Año</label>
                                <input 
                                    value= {this.state.student.año}
                                    type="text"
                                    className="form-control"
                                    disabled
                                />
                        </div>
                        <div className="form-group">
                            <label>Nota promedio</label>
                                <input 
                                    value= {this.state.student.nota_prom}
                                    type="text"
                                    className="form-control"
                                    disabled
                                />
                        </div>
                    <button type="submit" className="btn btn-danger btn-block">Delete</button>                                       
                    </form>
                </div>
            </div>
        </div>
        );
    };
};

export default DeleteStudent;