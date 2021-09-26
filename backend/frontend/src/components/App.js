import React, { Component } from "react";
import { render } from "react-dom";
import Nav from "./Nav";
import ClienteAdd from "./ClienteAdd";
import ClienteConsult from "./ClientGet"
import ClientModi from "./ClientModi";
import ClienteDelete from "./ClienteDelete";
import ProvAdd from "./ProvAdd";
import ProvConsult from "./ProvConsult";
import ProvModi from "./ProvModi";
import ProvDelete from "./ProvDelete";
import ProductoAdd from "./producto/ProductoAdd";
import ProductoConsult from "./producto/ProductoGet";
import ProductoModi from "./producto/ProductoModi";
import ProductoDelete from "./producto/ProductoDelete";
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
                        <Route path="/proveedor/modificar" component={ProvModi} />
                        <Route path="/proveedor/eliminar" component={ProvDelete} />
                        <Route path="/producto/agregar" component={ProductoAdd} />
                        <Route path="/producto/consultar" component={ProductoConsult} />
                        <Route path="/producto/modificar" component={ProductoModi} />
                        <Route path="/producto/eliminar" component={ProductoDelete} />
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

const appDiv = document.getElementById("app");
render(<App />, appDiv);
