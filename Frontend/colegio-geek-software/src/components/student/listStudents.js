function ListStudentRender (students){
    return(
    <div className="container mt-5">
        <div className="card">
            <div className="card-body">
                <h1 className="text-center"> List students </h1>
                <br/>    
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id student</th>
                            <th>Aprobado</th>
                            <th>Grupo</th>
                            <th>Id cuenta</th>
                            <th>N° de matricula</th>
                            <th>Año</th>
                            <th>Nota prom.</th>                        
                        </tr>
                    </thead>                       
                    <tbody>
                        {students.students.map((student, index) =>(                
                            <tr className="table-secondary" key={index}>
                                <td> {student.id_estudiante}</td>
                                <td> {student.aprobado}</td>
                                <td> {student.grupo}</td>
                                <td> {student.id_cuenta}</td>
                                <td> {student.nro_matricula}</td>
                                <td> {student.año}</td>
                                <td> {student.nota_prom}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>             
            </div>
        </div>
        <button>Anterior</button>
        <button>Siguiente</button>
    </div>
    )  
};
 export default ListStudentRender;