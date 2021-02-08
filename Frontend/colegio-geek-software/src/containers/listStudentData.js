import React, {Component} from 'react';
import axios from 'axios';
import ListStudentRender from '../components/listStudents';

class ListStudent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            students : [],
            next : "",
            previus :""
        };
    };

    async componentDidMount(){
 
        const res = await axios.get('http://localhost:5058/estudiantes')
        this.setState({students : res.data});                  
    };   

    render() {
        return (
            <>
                <ListStudentRender
                    students = {this.state.students}                              
                />
            </>
        );        
    };
}

export default ListStudent;