import React, {Component} from 'react';
import axios from 'axios';
import SearchStudentRender from '../components/SearchStudent';

class SearchStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id_student : '',
            student : []
        };
    };

    onSubmit = async e => {
        e.preventDefault();
        const res = await axios.get(`http://localhost:5058/estudiantes/${this.state.id_student}`); 
        this.setState({student : res.data});
        console.log(res);
    };

    render() {
        return (             
            <div className="container mt-5 ">
                <div className="card">
                    <div className="card-body">
                        <h1 className="text-center"> Search students </h1>                    
                        <div className="form-group">
                            <form className="form-inline my-2 my-lg-0" onSubmit={this.onSubmit}>
                                <input 
                                type="text" 
                                placeholder="id student" 
                                className="form-control mr-sm-2 "
                                onChange={(e) =>{this.setState({id_student : e.target.value})}}/>
                                <button type="submit" className="btn btn-info my-2 my-sm-0">Search</button>
                            </form>
                        </div>      
                    </div> 
                    <SearchStudentRender
                        data = {this.state.student}                   
                    />     
                </div>
            </div>  
        );
    };
};

export default SearchStudent;