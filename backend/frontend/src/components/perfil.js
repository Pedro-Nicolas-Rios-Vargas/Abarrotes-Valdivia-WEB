import React, { Component } from 'react';

export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pwd: '',
            pwdValid: '',
            email: '',
            msg: '',
        }

        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.getPasswordValidation = this.getPasswordValidation.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
        this.handleErrorDiv = this.handleErrorDiv.bind(this);
    }

    getUsername(event) {
        if (/^[a-zA-Z0-9.áéíóúÁÉÍÚÓÑñ]{0,16}$/.test(event.target.value)) {
            this.setState({
                username: event.target.value,
            });
        } else {
            this.setState({
                username: this.state.username,
                msg: 'No se aceptan caracteres especiales y su nombre de ' +
                'usuario no debe pasar de 16 caracteres',
            });
            this.handleErrorDiv();
        }
    }

    getPassword(event) {
        this.setState({
            pwd: event.target.value,
        });
    }

    getPasswordValidation(event) {
        this.setState({
            pwdValid: event.target.value,
        });
    }

    getEmail(event) {
        const emailAddress = event.target.value;
        if ((emailAddress.length >= 0 && emailAddress.length <= 64)) {
            this.setState({
                email: event.target.value,
            });
        } else {
            this.setState({
                email: this.state.email,
                msg: 'La dirección de correo no puede exceder de más de 64 ' +
                'caracteres',
            });
            this.handleErrorDiv();
        }
    }

    getUserInfo() {
        let request = {
            method: 'POST',
        };
        fetch('/perfil/recover-userinfo', request)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    username: data.username,
                    pwd: data.password,
                    email: data.email,
                });
            });
    }

    handleChanges() {
        if (this.state.username === '') {
            this.setState({
                msg: 'No ingresó un nombre de usuario',
            });
            this.handleErrorDiv();
            return;
        } else if (this.state.pwd === '') {
            this.setState({
                msg: 'No ingresó una contraseña',
            });
            this.handleErrorDiv();
            return;
        } else if (this.state.pwdValid === '') {
            // TODO: Lanzar error
            this.setState({
                msg: 'No confirmó la contraseña',
            });
            this.handleErrorDiv();
            return;
        } else if (this.state.email === '') {
            this.setState({
                msg: 'No ingresó un correo electrónico ',
            });
            this.handleErrorDiv();
            return;
        } else if (this.state.pwd !== this.state.pwdValid) {
            this.setState({
                msg: 'La contraseña y su validación no son iguales',
            });
            this.handleErrorDiv();
            return;
        }

        let validationEmailAddress = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.com/;
        if (!validationEmailAddress.test(this.state.email)) {
            this.setState({
                msg: 'El formato del correo electrónico no es el correcto',
            });
            this.handleErrorDiv();
            return
        }

        let request = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.username,
                pwd: this.state.pwd,
                email: this.state.email,
            })
        };
        fetch('/perfil/changing-userinfo', request)
            .then(response => response.json())
            .then(data => {
                console.log(data.Mensaje);
            });
    }

    handleErrorDiv() {
        let errorTag = document.querySelector(".error");
        errorTag.classList.toggle("invisible", false);
    }

    responseHandler() {
        let msg = this.state.msg;
        return (
            <div className="error invisible">
                <strong>
                    { msg }
                </strong>
            </div>
        );
    }

    componentDidMount() {
        this.getUserInfo();
    }

    render() {
        let afterResponse = this.responseHandler();
        return (
            <div className="container">
                <h2>
                    Perfil del usuario
                </h2>
                <div>
                    { afterResponse }
                </div>
                <form>
                    <div className="group">
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={ e => this.getUsername(e) }
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre de usuario</label>
                    </div>
                    <div className="group">
                        <input
                            type="password"
                            name="password"
                            value={this.state.pwd}
                            onChange={ e => this.getPassword(e) }
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Contraseña</label>
                    </div>
                    <div className="group">
                        <input
                            type="password"
                            name="password-valid"
                            value={this.state.pwdValid}
                            onChange={ e => this.getPasswordValidation(e) }
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Confirmar contraseña</label>
                    </div>
                    <label className="titulo-input-perfil">Correo Electrónico</label>
                    <div className="group">
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={ e => this.getEmail(e) }
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                    </div>
                </form>
                <div className="footer">
                    <button
                        className="btn"
                        type="button"
                        onClick={ () => this.handleChanges() }
                    >
                        Modificar
                </button>
                </div>
            </div>
        )
    }
}
