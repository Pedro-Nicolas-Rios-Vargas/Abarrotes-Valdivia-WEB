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
import Login from "./login"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useLocation,
} from "react-router-dom";

function Switches(props) {
    return (
        <Switch>
            {/* <Route path="" exact component={Home} /> */}
            <Route exact path="/" component={Login} />
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
            <Route path="/venta/agregar" component={SellAdd} />
            <Route path="/venta/consultar" component={SellLog} />
            <Route path="/compras/agregar" component={BuyAdd} />
            <Route path="/compras/consultar" component={BuyLog} />
        </Switch>
    );
}

//function Login() {
//    return (
//        <div className="container login">
//            <h2>Login
//            </h2>
//            <form>
//                <div className="group">
//                    <input className= "loginInput" type="text" required onChange={e => this.getNameProv(e)} />
//                    <span className="highlightLogin"></span>
//                    <span className="barLogin"></span>
//                    <label>Nombre</label>
//                </div>
//
//                <div className="group">
//                    <input className= "loginInput" type="text" required onChange={e => this.getprovPhoneNum(e)} />
//                    <span className="highlightLogin"></span>
//                    <span className="barLogin"></span>
//                    <label>Contraseña</label>
//                </div>
//            </form>
//            <div className="footer">
//                <button className="btn"><a className="abtn" href="/home">Confirmar</a></button>
//            </div>
//        </div>
//    );
//}

function noMatch() {
    let path = useLocation();
    return (
        <div>
            <h3>No existe la ruta <code>{path.pathname}</code></h3>
        </div>
    );
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sw: false,
        }
    }

    render() {
        return (
            <div>
                <Switch>
                    {/* <Route path="" exact component={Home} /> */}
                    <Route exact path="/" component={Login}>
                    </Route>
                    <Route exact path="/home/" >
                        <div className="App">
                            <main>
                                <Nav />
                            </main>
                        </div>
                    </Route>
                    <Route path="/cliente/add">
                    <div className="App">
                            <main>
                                <Nav />
                                <ClienteAdd />
                            </main>
                        </div>
                    </Route>
                    <Route path="/cliente/consultar" >
                    <div className="App">
                            <main>
                                <Nav />
                                <ClienteConsult />
                            </main>
                        </div>
                    </Route>
                    <Route path="/cliente/modificar">
                    <div className="App">
                            <main>
                                <Nav />
                                <ClientModi />
                            </main>
                        </div>
                    </Route>
                    <Route path="/cliente/eliminar">
                    <div className="App">
                            <main>
                                <Nav />
                                <ClienteDelete />
                            </main>
                        </div>
                    </Route>
                    <Route path="/proveedor/agregar">
                    <div className="App">
                            <main>
                                <Nav />
                                <ProvAdd />
                            </main>
                        </div>
                    </Route>
                    <Route path="/proveedor/consultar">
                    <div className="App">
                            <main>
                                <Nav />
                                <ProvConsult />
                            </main>
                        </div>
                    </Route>
                    <Route path="/proveedor/modificar">
                    <div className="App">
                            <main>
                                <Nav />
                                <ProvModi />
                            </main>
                        </div>
                    </Route>
                    <Route path="/proveedor/eliminar">
                    <div className="App">
                            <main>
                                <Nav />
                                <ProvDelete />
                            </main>
                        </div>
                    </Route>
                    <Route path="/producto/agregar">
                    <div className="App">
                            <main>
                                <Nav />
                                <ProductoAdd />
                            </main>
                        </div>
                    </Route>
                    <Route path="/producto/consultar">
                    <div className="App">
                            <main>
                                <Nav />
                                <ProductoConsult />
                            </main>
                        </div>
                    </Route>
                    <Route path="/producto/modificar">
                    <div className="App">
                            <main>
                                <Nav />
                                <ProductoModi />
                            </main>
                        </div>
                    </Route>
                    <Route path="/producto/eliminar">
                    <div className="App">
                            <main>
                                <Nav />
                                <ProductoDelete />
                            </main>
                        </div>
                    </Route>
                    <Route path="/venta/agregar">
                    <div className="App">
                            <main>
                                <Nav />
                                <SellAdd />
                            </main>
                        </div>
                    </Route>
                    <Route path="/venta/consultar">
                    <div className="App">
                            <main>
                                <Nav />
                                <SellLog />
                            </main>
                        </div>
                    </Route>
                    <Route path="/compras/agregar">
                    <div className="App">
                            <main>
                                <Nav />
                                <BuyAdd />
                            </main>
                        </div>
                    </Route>
                    <Route path="/compras/consultar">
                    <div className="App">
                            <main>
                                <Nav />
                                <BuyLog />
                            </main>
                        </div>
                    </Route>
                    <Route path="*">

                    </Route>
                </Switch>
            </div>
        );
    }
}


const appDiv = document.getElementById("app");
render(
    <Router>
        <App />
    </Router>
    , appDiv);
