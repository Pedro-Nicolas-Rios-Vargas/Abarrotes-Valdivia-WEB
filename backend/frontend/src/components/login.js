import React, { Component } from "react";
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
/**
 * Componente Login
 */
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pwd: '',
            msg: 'hoal'
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePwd = this.handlePwd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
        this.handleErrorDiv = this.handleErrorDiv.bind(this);
    }
    /**
     * Optener nombre de usuario
     * @param {string} event 
     */
    handleUsername(event) {
        this.setState({
            username: event.target.value
        });
    }
    /**
     * Obtener contrasena
     * @param {string} event 
     */
    handlePwd(event) {
        this.setState({
            pwd: event.target.value
        });
    }
    /**
     * Mostrar mensajes de error
     */
    handleErrorDiv() {
        let errorTag = document.querySelector(".error");
        errorTag.classList.toggle("invisible", false);
    }
    /**
     *  Mandar datos a verificar
     * @param {???} event 
     * @returns Puede regresar error
     */
    handleSubmit(event) {
        if (!this.state.username) {
            console.log('Username esta vacio')
            this.setState({
                msg: 'No ha ingresado nada en el campo usuario.'
            });
            this.handleErrorDiv();
            return;
        }
        if (!this.state.pwd) {
            console.log('Pwd esta vacio')
            this.setState({
                msg: 'No ha ingresado nada en el campo contraseña.'
            });
            this.handleErrorDiv();
            return;
        }
        let request = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.username,
                pwd: this.state.pwd,
            })
        };
        fetch("/login/valid", request).
            then((response) => {
                return response.json();
            }).
            then((data) => {
                this.setState({
                    msg: data.Mensaje,
                });
                if (this.state.msg != 'Logged In') {
                    this.handleErrorDiv();
                }
            });
    }
    /**
     * Respuesta del metodo anterior para poder entrar en el programa o algo asi
     * @returns Compoenente Principal
     */
    responseHandler() {
        let msg = this.state.msg;
        if (msg === 'Logged In') {
            return <Redirect to="/home/"/>
        } else if (msg) {
            return (
                <div className="error invisible">
                    <strong>
                        { msg }
                    </strong>
                </div>
            )
        }
    }

    render() {
        let afterResponse = this.responseHandler();
        return (
            <div className="container login">
                <h2>
                    Login
                </h2>
                <div>
                    { afterResponse }
                </div>
                <form>
                    <div className="group">
                        <input
                            id="username"
                            className="loginInput"
                            type="text"
                            required
                            onChange={e => this.handleUsername(e)}
                            value={ this.state.username }
                        />
                        <span className="highlightLogin"></span>
                        <span className="barLogin"></span>
                        <label htmlFor="username">Nombre</label>
                    </div>

                    <div className="group">
                        <input
                            id="password"
                            className="loginInput"
                            type="password"
                            required
                            onChange={e => this.handlePwd(e)}
                        />
                        <span className="highlightLogin"></span>
                        <span className="barLogin"></span>
                        <label htmlFor="password">Contraseña</label>
                    </div>
                </form>
                <div className="footer">
                    <button
                        className="btn"
                        onClick={ e => this.handleSubmit(e) }>
                        Confirmar
                    </button>
                </div>
            </div>
        );
    }
}
