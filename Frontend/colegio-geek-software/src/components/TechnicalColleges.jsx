import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'

export default class TechnicalColleges extends Component {
    render() {
        return (
            <div>
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src="https://arquiniel.com/wp-content/uploads/2019/02/destacada_0004_NUESTRA-SEÑORA-1920x1200.jpg"
                            alt="I.E Las Nieves"
                        />
                        <Carousel.Caption>
                            <h3>Colegios EDU – S.E. Nuestra Señora de las Nieves – Medellín</h3>
                            <p>El proyecto se ubica al nororiente de la ciudad de Medellín, Colombia, barrio Manrique central.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src="https://pbs.twimg.com/media/Df6SVMQXUAArdor.jpg"
                            alt="I.E Concejo de Medellin"
                        />
                        <Carousel.Caption>
                            <h3>Institución Educativa Concejo De Medellín (I.E.C.M)</h3>
                            <p>2002: Por resolución No. 16290 de noviembre del 2002 y para dar cumplimiento a la Ley General de Educación se da término a la fusión con las escuelas destinadas por la Secretaria de Educación Departamental: Clodomiro Ramírez, Juan XXIII, y la Escuela Pichincha.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="http://calidadieru.weebly.com/uploads/1/2/2/4/12240760/7870010_orig.jpg"
                            alt="I.E Republica de Uruguay"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src="https://www.minuto30.com/wp-content/uploads/2015/01/Instituci%C3%B3n-Educativa-Javiera-Londo%C3%B1o-3.jpg"
                            alt="I.E Javiera-Londoño"
                        />
                        <Carousel.Caption>
                            <h3>Institución-Educativa-Javiera-Londoño</h3>
                            <p>La Institución Educativa Javiera Londoño, de carácter oficial, comprometida con la calidad en los procesos, ofrece los niveles de educación formal: Pre-escolar, Básica, Media Académica y Técnica articulada con la Educación Superior por ciclos propedéuticos.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}
