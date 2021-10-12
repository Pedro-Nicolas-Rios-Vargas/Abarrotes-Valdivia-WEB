import React, { Component } from "react";
import { render } from "react-dom";
import Nav from "./Nav";
import ClienteAdd from "./cliente/ClienteAdd";
import ClienteConsult from "./cliente/ClientGet"
import ClientModi from "./cliente/ClientModi";
import ClienteDelete from "./cliente/ClienteDelete";
import ProvAdd from "./proveedor/ProvAdd"
import ProvConsult from "./proveedor/ProvConsult"
import ProvModi from "./proveedor/ProvModi"
import ProvDelete from "./proveedor/ProvDelete"
import ProductoAdd from "./producto/ProductoAdd";
import ProductoConsult from "./producto/ProductoGet";
import ProductoModi from "./producto/ProductoModi";
import ProductoDelete from "./producto/ProductoDelete";
import SellAdd from "./venta/SellAdd";
import SellLog from "./venta/SellLog";
import BuyAdd from "./compras/BuyAdd";
import BuyLog from "./compras/BuyLog";
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
            <Route path="home/cliente/add" component={ClienteAdd} />
            <Route path="home/cliente/consultar" component={ClienteConsult} />
            <Route path="home/cliente/modificar" component={ClientModi} />
            <Route path="home/cliente/eliminar" component={ClienteDelete} />
            <Route path="home/proveedor/agregar" component={ProvAdd} />
            <Route path="home/proveedor/consultar" component={ProvConsult} />
            <Route path="home/proveedor/modificar" component={ProvModi} />
            <Route path="home/proveedor/eliminar" component={ProvDelete} />
            <Route path="home/producto/agregar" component={ProductoAdd} />
            <Route path="home/producto/consultar" component={ProductoConsult} />
            <Route path="home/producto/modificar" component={ProductoModi} />
            <Route path="home/producto/eliminar" component={ProductoDelete} />
            <Route path="home/venta/agregar" component={SellAdd} />
            <Route path="home/venta/consultar" component={SellLog} />
            <Route path="home/compras/agregar" component={BuyAdd} />
            <Route path="home/compras/consultar" component={BuyLog} />
        </Switch>
    );
}

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="App">
                <Nav />
                <main>
                    <Switches />

                </main>
            </div>
        );
    }
}


// const appDiv = document.getElementById("app");
// render(
//     <Router>
//         <App />
//     </Router>
//     , appDiv);
