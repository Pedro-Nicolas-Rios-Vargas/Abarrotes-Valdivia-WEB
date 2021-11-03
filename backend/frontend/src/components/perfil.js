import React, { Component } from 'react';

export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pwd: '',
            pwdValid: '',
            email: '',
            pwdConfirm: '',
            msg: '',
        }

        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.getPasswordValidation = this.getPasswordValidation.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.getPasswordConfirm = this.getPasswordConfirm.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.makeValidations = this.makeValidations.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
        this.handleErrorDiv = this.handleErrorDiv.bind(this);
        this.makeChanges = this.makeChanges.bind(this);
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
        const newPassword = event.target.value;
        if (newPassword.length >= 0 && newPassword.length <= 16) {
            const inputPassValidation = document.getElementById('input-validating-pass');
            if (newPassword.length == 0) {
                inputPassValidation.hidden = true;
            } else {
                inputPassValidation.hidden = false;
            }

            this.setState({
                pwd: newPassword,
            });
        } else {
            this.setState({
                pwd: this.state.pwd,
                msg: 'La contraseña no debe pasar de 16 caracteres',
            });
            this.handleErrorDiv();
        }
    }

    getPasswordValidation(event) {
        const newPassword = event.target.value;
        if (newPassword.length >= 0 && newPassword.length <= 16) {
            this.setState({
                pwdValid: event.target.value,
            });
        } else {
            this.setState({
                pwd: newPassword,
                msg: 'La contraseña no debe pasar de 16 caracteres',
            });
            this.handleErrorDiv();
        }
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

    getPasswordConfirm(event) {
        const password = event.target.value;
        if (password.length >= 0 && password.length <= 16) {
            this.setState({
                pwdConfirm: password,
            });
        } else {
            this.setState({
                pwdConfirm: this.state.pwdConfirm,
                msg: 'La contraseña no debe pasar de 16 caracteres',
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
                    email: data.email,
                });
            });
    }

    makeValidations() {
        if (this.state.pwd !== '') {
            if (this.state.pwdValid === '') {
                this.setState({
                    msg: 'Debe validar la nueva contraseña',
                });
                this.handleErrorDiv();
                return;
            } else if (this.state.pwd !== this.state.pwdValid) {
                this.setState({
                    msg: 'La nueva contraseña y su validación no son iguales',
                });
                this.handleErrorDiv();
                return;
            }
        }

        let validationEmailAddress = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.com/;
        if (!validationEmailAddress.test(this.state.email)) {
            this.setState({
                msg: 'El formato del correo electrónico no es el correcto',
            });
            this.handleErrorDiv();
            return;
        }

        if (this.state.pwdConfirm !== '') {
            let request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pwd: this.state.pwdConfirm,
                }),
            };
            fetch('/perfil/verifying-password', request)
                .then(response => response.json())
                .then(data => {
                    if (data.Mensaje == true) {
                        this.makeChanges();
                    } else {
                        this.setState({
                            msg: 'La contraseña que ingreso es incorrecta'
                        });
                        this.handleErrorDiv();
                    }
                })
        } else {
            this.setState({
                msg: 'Debe ingresar su contraseña actual para validar los cambios',
            });
            this.handleErrorDiv();
            return
        }

    }

    makeChanges() {
        const username = this.state.username === '' ? 'hoal' : this.state.username;
        const pwd = this.state.pwd === '' ? 'hoal' : this.state.pwd;
        const email = this.state.email === '' ? 'hoal' : this.state.email;

        let request = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                pwd: pwd,
                email: email,
            })
        };
        fetch('/perfil/changing-userinfo', request)
            .then(response => response.json())
            .then(data => {
                const msg = data.Mensaje;
                this.setState({
                    msg: msg,
                });

                if (msg === 'Cambios realizados') {
                    this.handleAcceptStatus();
                } else {
                    this.handleErrorDiv();
                }
            });
    }

    handleErrorDiv() {
        let errorTag = document.querySelector(".error");
        errorTag.classList.toggle("invisible", false);
        errorTag.classList.toggle("accept-Valid", false);
    }

    handleAcceptStatus() {
        let errorTag = document.querySelector(".error");
        errorTag.classList.toggle("invisible", false);
        errorTag.classList.toggle("accept-Valid", true);
    }

    responseHandler() {
        let msg = this.state.msg;
        return (
            <div className="error accept-Valid invisible">
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
                    Modificar datos del usuario
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
                        <label>Nueva contraseña</label>
                    </div>
                    <div id="input-validating-pass" hidden className="group">
                        <input
                            type="password"
                            name="password-valid"
                            value={this.state.pwdValid}
                            onChange={ e => this.getPasswordValidation(e) }
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Confirmar nueva contraseña</label>
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
                    <div className="group">
                        <input
                            type="password"
                            name="password-confirm"
                            value={ this.state.pwdConfirm}
                            onChange={ e => this.getPasswordConfirm(e) }
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Ingrese su contraseña</label>
                    </div>
                </form>
                <div className="footer">
                    <button
                        className="btn"
                        type="button"
                        onClick={ () => this.makeValidations() }
                    >
                        Modificar
                </button>
                </div>
            </div>
        )
    }
}
