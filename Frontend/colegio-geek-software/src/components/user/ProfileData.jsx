import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import UsuarioContext from '../../context/UsuarioContext'


export default class ProfileData extends Component {
    render() {
        return (
            <div>
                <UsuarioContext.Consumer>
                    {user => <>
                        {user !== undefined ?
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th colSpan={2}>Datos de usuario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ID Usuario</td>
                                        <td>{user.idUsuario}</td>
                                    </tr>
                                    <tr>
                                        <td>Correo</td>
                                        <td>{user.apellido}</td>
                                    </tr>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>{user.nombre}</td>
                                    </tr>
                                    <tr>
                                        <td>Apellido</td>
                                        <td>{user.apellido}</td>
                                    </tr>
                                    <tr>
                                        <td>Nombre Usuario</td>
                                        <td>{user.nombreUsuario}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            : <div></div>}
                    </>}
                </UsuarioContext.Consumer>
            </div>
        )
    }
}
