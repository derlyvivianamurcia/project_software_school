import React, {Component} from 'react';
import axios from 'axios';

class StudentInfoContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_student : "",
            student : [],
        };
    };

    onSubmitEdit = async e => {
       
        await axios.put(`http://localhost:5058/estudiantes/${this.state.id_student}`, {        
            aprobado : this.state.aprobado,
            grupo : this.state.grupo,
            id_cuenta : this.state.id_cuenta,
            nro_matricula : this.state.nro_matricula,
            año : this.state.año,
            nota_prom : this.state.nota_prom
        });
        location.reload();
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
                        <h1 className="text-center"> Edit students </h1>
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
                    <form onSubmit={this.onSubmitEdit}>
                        <br/>
                        <div className="form-group">
                            <label>Aprobado</label>
                                <input 
                                    type="text"
                                    defaultValue ={this.state.student.aprobado}
                                    onChange={(e) =>{this.setState({aprobado : e.target.value})}}
                                    className="form-control"
                                    required
                                />
                        </div>                       
                        <div className="form-group">
                            <label>Grupo</label>
                                <input 
                                    type="text"
                                    defaultValue ={this.state.student.grupo}
                                    onChange={(e) =>{this.setState({grupo : e.target.value})}}
                                    className="form-control"
                                    required
                                />
                        </div>
                        <div className="form-group">
                            <label>Id cuenta</label>
                                <input
                                type="text"
                                defaultValue ={this.state.student.id_cuenta}
                                className="form-control"
                                onChange={(e) =>{this.setState({id_cuenta: e.target.value})}}
                                required
                                />
                        </div>
                        <div className="form-group">
                            <label>N° matricula</label>
                            <input 
                                type="text"
                                defaultValue ={this.state.student.nro_matricula}
                                onChange={(e) =>{this.setState({nro_matricula : e.target.value})}}  
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Año</label>
                                <input 
                                    type="text"
                                    defaultValue ={this.state.student.año}                       
                                    onChange={(e) =>{this.setState({año: e.target.value})}}  
                                    className="form-control"
                                    required                                    
                                />
                        </div>                   
                        <div className="form-group">
                            <label>Nota promedio</label>
                                <input 
                                    type="text"
                                    defaultValue ={this.state.student.nota_prom}
                                    onChange={(e) =>{this.setState({nota_prom : e.target.value})}}
                                    className="form-control"
                                    required
                                />
                        </div>
                    <button type="submit" className="btn btn-warning btn-block">Edit</button>                                       
                    </form>
                </div>
            </div>
        </div>
        );
    };
};

export default StudentInfoContainer;