import React from 'react'

const UsuarioContext = React.createContext({
    idUsuario : null,
    nombreUsuario : null,
    nombre : null,
    correo : null,
    apellido : null
});

export default UsuarioContext;

