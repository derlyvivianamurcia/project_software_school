function SearchStudentRender (data){
    return (
        <div className="container mt-5 ">
            <div className="card mb-5">            
                <div className="card-body mb-5">
                    <form id="form" >
                    <br/>
                    {data.data.map((student) =>(
                       <div key={student.id_estudiante}> 
                            <div className="form-group">                      
                                <label>Id student</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={student.id_estudiante}
                                    disabled
                                />
                            </div> 
                            <div className="form-group">
                                <label>Aprobado</label>
                                    <input 
                                        type="text"                     
                                        className="form-control"
                                        value={student.aprobado}
                                        disabled
                                    />
                            </div>
                            <div className="form-group">
                                <label>Grupo</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={student.grupo}
                                        disabled
                                    />
                            </div>
                            <div className="form-group">
                                <label>Id cuenta</label>
                                    <input 
                                    type="text"
                                    className="form-control" 
                                    value={student.id_cuenta}
                                    disabled
                                    />
                            </div>
                            <div className="form-group">
                                <label>N° Matricula</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={student.nro_matricula}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label>Año</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={student.año}
                                        disabled
                                    />
                            </div>                   
                            <div className="form-group">
                                <label>Nota promedio</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        value={student.nota_prom}
                                        disabled
                                    />
                            </div> 
                        </div> 
                    ))}                                      
                    </form>
                </div>
            </div>
        </div>   
    );
};

export default SearchStudentRender;