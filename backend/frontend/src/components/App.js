import React, { Component } from "react";
import { render } from "react-dom";
import Nav from "./Nav";
import ClienteAdd from "./ClienteAdd";
import ClienteConsult from "./ClientGet"
import ClientModi from "./ClientModi";
import ClienteDelete from "./ClienteDelete";
import ProvAdd from "./ProvAdd"
import ProvConsult from "./ProvConsult"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Nav />
                    <Switch>
                        {/* <Route path="" exact component={Home} /> */}
                        <Route path="/cliente/add" component={ClienteAdd} />
                        <Route path="/cliente/consultar" component={ClienteConsult} />
                        <Route path="/cliente/modificar" component={ClientModi} />
                        <Route path="/cliente/eliminar" component={ClienteDelete} />
                        <Route path="/proveedor/agregar" component={ProvAdd} />
                        <Route path="/proveedor/consultar" component={ProvConsult} />
                    </Switch>
                </div>
            </Router>

        );
    }
}

const Home = (
    <div>
        <h1>Pagina base</h1>
    </div>
);

const appDiv = document.getElementById("app")
render(<App />, appDiv);