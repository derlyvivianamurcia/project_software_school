import React from 'react';
import {withFormik, Field, ErrorMessage} from 'formik';
import axios from 'axios';
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
                        <h1 className="text-center"> Add Student </h1>
                        <br/>
                        
                        <div className="form-group">
                            Grupo
                            <Field 
                                name="grupo"
                                type="text"
                                className="form-control"
                                placeholder="Grupo"
                            />
                            <br/>
                            <ErrorMessage name="grupo">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>

                        <div className="form-group">
                            Id de cuenta:
                            <Field
                                name="id_cuenta"
                                type="text"
                                className="form-control"
                                placeholder="Id de cuenta"
                            />
                            <br/>
                            <ErrorMessage name="id_cuenta">
                                {messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>                        
                        </div>
                        
                        <div className="form-group">
                            N° de matricula:
                            <Field 
                                name="nro_matricula"
                                type="text"
                                className="form-control"
                                placeholder="N° de matricula"
                            />
                            <br/>
                            <ErrorMessage name="nro_matricula">
                                { messages => 
                                    <div className="alert alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{messages}</strong>                            
                                    </div>                                
                                }                                
                            </ErrorMessage>  
                        </div>

                        <div className="form-group">
                            Año:
                            <Field
                                name="año"
                                type="text"
                                className="form-control"
                                placeholder="Año"
                            />
                            <br/>
                            <ErrorMessage name="año">
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
            grupo : '',
            id_cuenta : '',
            nro_matricula : '',
            año : '',
        };
    },

    //Validaciones.
    async validate(values){
        const errors = {};


        (!values.grupo) ? errors.grupo = "Grupo is required." : 
            (values.grupo.length < 1) ? errors.grupo = "Grupo must be at least 1 caracteres.":
            true;

        (!values.id_cuenta) ? errors.id_cuenta = "Id cuenta is required." : 
            (values.id_cuenta.length < 1) ? errors.id_cuenta = "Id cuenta must be at least 1 caracteres.":
            true;

        (!values.nro_matricula) ? errors.nro_matricula = "N° de matricula is required." : 
            (values.nro_matricula.length < 1) ? errors.nro_matricula = "N° de matricula must be at least 1 caracteres.":
            true;

        (!values.año) ? errors.año = "Año cuenta is required." : 
            (values.año.length < 4) ? errors.año = "Año must be at least 4 caracteres.":
            true;        

        return errors;
    },

    async handleSubmit(values, formikBag){   
        await axios.post('http://localhost:5058/estudiantes', {            
            grupo : values.grupo,
            id_cuenta : values.id_cuenta,
            nro_matricula : values.nro_matricula,
            año : values.año,          
        });

        formikBag.setSubmitting(false);
        location.reload();
    },    
}) (Form);