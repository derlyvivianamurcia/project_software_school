import React, { Component } from 'react'


export default class DocenteApp extends Component {
    render() {
        console.log()
        return (
          <div className="container mt-5">
          <div className="card">
              <div className="card-body">
                  <h1 className="text-center"> List students </h1>
                  <br/>    
                  <table className="table table-hover">
                      <thead>
                          <tr>
                              <th>Id student</th>
                              <th>Name student</th>
                              <th>Surnames student</th>
                              <th>Document type</th>
                              <th>Document number</th>
                              <th> Mail</th>
                              <th> Sex</th>
                          </tr>
                      </thead>                       
                      <tbody>
                          {DocenteApp.students.map((student) =>(                
                              <tr className="table-primary" key={student.id_student}>
                                  <td> {student.id_student}</td>
                                  <td> {student.name_student}</td>
                                  <td> {student.surnames_student}</td>
                                  <td> {student.document_type}</td>
                                  <td> {student.document_number}</td>
                                  <td> {student.mail}</td>
                                  <td> {student.sex}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>             
              </div>
          </div>
          </div>
          
        )
    }
}