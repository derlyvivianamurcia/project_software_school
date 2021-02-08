import React from 'react';
import {withFormik, Field, ErrorMessage} from 'formik';
import axios from 'axios';



function Form(props) {

    const {
        handleSubmit,
        isSubmitting, // Para saber si el formulario esta en proceso de su
        isValid,
    } = props;

    return (
        <div className="container mt-5">
             <div className="card">
                <div className="card-body"> 
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-center"> Add Cuenta</h1>
                        <br/>
                        
                        <div className="form-group">
                            Correo:
                            <Field
                                name="correo"
                                type="mail"
                                className="form-control"
                                placeholder="correo"      
                            />
                            <br/>
                            <ErrorMessage name="correo">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>

                        <div className="form-group">
                            Contraseña
                            <Field 
                                name="contraseña"
                                type="text"
                                className="form-control"
                                placeholder="Contraseña"
                            />
                            <br/>
                            <ErrorMessage name="contraseña">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>

                        <div className="form-group">
                            Tipo de cuenta:
                            <Field 
                                name="tipo_cuenta"
                                type="text"
                                className="form-control"
                                placeholder="tipo de cuenta"
                            />
                            <br/>
                            <ErrorMessage name="tipo_cuenta">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>
                        
                        <div className="form-group">
                            Edad:
                            <Field 
                                name="edad"
                                type="text"
                                className="form-control"
                                placeholder="Edad"
                            />
                            <br/>
                            <ErrorMessage name="edad">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>

                        <div className="form-group">
                            Fecha de nacimiento:
                            <Field
                                name="fecha_de_nacimiento"
                                type="date"
                                className="form-control"
                                placeholder="Fecha de nacimiento"
                            />
                            <br/>
                            <ErrorMessage name="fecha_de_nacimiento">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>

                        <div className="form-group">
                            Tipo de documento:
                            <Field 
                                name="tipo_de_documento"
                                type="text"
                                className="form-control"
                                placeholder="Tipo de documento"
                            />
                            <br/>
                            <ErrorMessage name="tipo_de_documento">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>

                        <div className="form-group">
                            N° de documento:
                            <Field 
                                name="nro_de_documento"
                                type="text"
                                className="form-control"
                                placeholder="N° de documento"
                            />
                            <br/>
                            <ErrorMessage name="nro_de_documento">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>

                        <div className="form-group">
                            Nombres:
                            <Field 
                                name="nombre"
                                type="text"
                                className="form-control"
                                placeholder="Nombres"
                            />
                            <br/>
                            <ErrorMessage name="nombre">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>

                        <div className="form-group">
                            Apellidos:
                            <Field 
                                name="apellidos"
                                type="text"
                                className="form-control"
                                placeholder="Apellidos"
                            />
                            <br/>
                            <ErrorMessage name="apellidos">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>

                        <div className="form-group">
                            Genero:
                            <Field 
                                name="genero"
                                type="text"
                                className="form-control"
                                placeholder="genero"
                            />
                            <br/>
                            <ErrorMessage name="genero">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>

                        <div className="form-group">
                            Estado:
                            <Field 
                                name="estado"
                                type="text"
                                className="form-control"
                                placeholder="Estado"
                            />
                            <br/>
                            <ErrorMessage name="estado">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>

                        <div className="form-group">    
                            <button 
                            type="submit" 
                            className=
                            {`submit ${isSubmitting || !isValid ? 'disabled' : ''} btn btn-primary btn-block`}
                            disabled={isSubmitting || !isValid}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>    
        </div>
    );
};

export default withFormik({
    //Asignando un valor vacio a los campos de texto.
    mapPropsToValues (){
        return{
            correo: "",
            contraseña : "",
            edad : "",
            tipo_de_documento : "",
            nro_de_documento :"",
            fecha_de_nacimiento : "",
            nombre : "",
            apellidos : "",
            genero : "",
            estado : "", 
        };
    },

    //Validaciones.
    async validate(values){
        const errors = {};
        
        return errors;
    },  

    async handleSubmit(values, formikBag){        
        await axios.post('http://localhost:5058/cuenta', {
            correo : values.correo,
            contraseña : values.contraseña,
            tipo_cuenta : values.tipo_cuenta,
            edad : values.edad,
            fecha_de_nacimiento : values.fecha_de_nacimiento,
            tipo_de_documento : values.tipo_de_documento,
            nro_de_documento : values.nro_de_documento,
            nombre : values.nombre,
            apellidos : values.apellidos,
            genero : values.genero,
            estado : values.estado,
        });        
        formikBag.setSubmitting(false);
        location.reload();
    },    
}) (Form);