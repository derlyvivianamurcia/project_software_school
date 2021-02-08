
import ListStudent from '.../containers/listStudentData';
import SearchStudent from '.../containers/SearchStudent';
import EditStudent from '.../containers/editStudent';
import DeleteStudent from '.../containers/deleteStudent';
import AddStudentFormik from '.../containers/addStudentFormik';
import AddCuentaFormik from '.../containers/AddCuentaFormik';

function Students(){  

    return (
        <div className=" container jumbotron mt-5">
           <ul className="nav nav-tabs" role="tablist">

                <li role="presentation">
                    <a className="nav-link active" data-toggle="tab" href="#addCount">Add count</a>
                </li>
                <li role="presentation">
                    <a className="nav-link" data-toggle="tab" href="#add">Add Students</a>
                </li>
                <li role="presentation">
                    <a className="nav-link" data-toggle="tab" href="#list">List</a>
                </li>
                <li role="presentation">
                    <a className="nav-link" data-toggle="tab" href="#search">Search</a>
                </li>
                <li role="presentation">
                    <a className="nav-link" data-toggle="tab" href="#edit">Edit</a>
                </li>
                <li role="presentation">
                    <a className="nav-link" data-toggle="tab" href="#delete">Delete</a>
                </li>                   
            </ul>
            <div id="myTabContent" className="tab-content">
                <div className="tab-pane fade show active " id="addCount">
                    <AddCuentaFormik/>
                </div>
                <div className="tab-pane fade show " id="add">
                    <AddStudentFormik/>
                </div>
                <div className="tab-pane fade" id="list">
                    <ListStudent/>
                </div>
                <div className="tab-pane fade" id="search">
                    <SearchStudent/>
                </div>
                <div className="tab-pane fade" id="edit">
                    <EditStudent/>
                </div>
                <div className="tab-pane fade" id="delete">
                    <DeleteStudent/>
                </div>
                
            </div>
        </div>
    );
};

export default Students;