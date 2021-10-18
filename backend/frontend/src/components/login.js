import React, { Component } from "react";
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

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
    }

    handleUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    handlePwd(event) {
        this.setState({
            pwd: event.target.value
        });
    }

    handleSubmit(event) {
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
                console.log(response)
                if (response.ok) {
                    // Make a redirection
                } else if (response.status == 406) {
                    console.log(response.body)
                }
            })
    }

    render() {
        const errorMessage = (
            <div className="errorMessage">
                <span>
                    { this.state.msg }
                </span>
            </div>
        );
        return (
            <div className="container login">
                <h2>
                    Login
                </h2>
                <br/>
                { errorMessage }
                <form onSubmit={ this.handleSubmit }>
                    <div className="group">
                        <input
                            id="username"
                            className="loginEntrada"
                            type="text"
                            required
                            onChange={e => this.handleUsername(e)}
                            value={ this.state.username }
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label for="username">Nombre</label>
                    </div>

                    <div className="group">
                        <input
                            id="password"
                            className="loginEntrada"
                            type="password"
                            required
                            onChange={e => this.handlePwd(e)}
                            value={ this.state.pwd }
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label for="password">Contraseña</label>
                    </div>
                    <div className="footer">
                      //<Link to="/home"><button className="btn"  >Confirmar</button></Link>
                        <input
                        className="btn"
                        type="submit"
                        value="Confirmar"/>
                    </div>
                </form>
            </div>
        );
    }
}

// const appDiv = document.getElementById("app");
// render(
//     <Router>
//         <Login />
//     </Router>
//     , appDiv);
