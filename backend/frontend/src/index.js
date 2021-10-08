import App from "./components/App";
import React, { Component } from "react";
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

function Switches(props) {
    return (
        <Switch>
            {/* <Route path="" exact component={Home} /> */}
            <Route path="/home" component={App} />
        </Switch>
    );
}
export default class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container login">
                <Switch />
                <h2>Login
                </h2>
                <form>
                    <div className="group">
                        <input className="loginInput" type="text" required onChange={e => this.getNameProv(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>

                    <div className="group">
                        <input className="loginInput"  type="text" required onChange={e => this.getprovPhoneNum(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Contraseña</label>
                    </div>
                </form>
                <div className="footer">
                    <Link to="/home"><button className="btn"  >Confirmar</button></Link>
                </div>
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