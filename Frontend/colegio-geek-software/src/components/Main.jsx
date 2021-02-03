import React, { Component } from "react"
import SideBar from "./sidebar/SideBar"
import Content from "./content/Content"
import UsuarioContext from '../context/UsuarioContext'

export default class Main extends Component {
    constructor(props) {
        super()

        // Moblie first
        this.state = {
            isOpen: false,
            isMobile: true
        };

        this.previousWidth = -1;
    }

    updateWidth() {
        const width = window.innerWidth;
        const widthLimit = 576;
        const isMobile = width <= widthLimit;
        const wasMobile = this.previousWidth <= widthLimit;

        if (isMobile !== wasMobile) {
            this.setState({
                isOpen: !isMobile
            });
        }

        this.previousWidth = width;
    }

    componentDidMount() {
        if(localStorage.getItem("usuario") != null){
            this.usuario = JSON.parse(localStorage.getItem("usuario"))
        }else{
            this.props.history.push('/iniciar-sesion')
        }
        this.updateWidth();
        window.addEventListener("resize", this.updateWidth.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWidth.bind(this));
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        return (
            <>
                <UsuarioContext.Provider value={this.usuario}>
                    <SideBar toggle={this.toggle} isOpen={this.state.isOpen} {...this.props} />
                    <Content toggle={this.toggle} isOpen={this.state.isOpen} {...this.props} />
                </UsuarioContext.Provider>
            </>
        );
    }
}