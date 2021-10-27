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
import Backup from "./Backups/Backup";
import Restore from "./Backups/Restore";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

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
                    <Route path="/Backup/BackupRespaldo">
                    <div className="App">
                            <main>
                                <Nav />
                                <Backup/>
                            </main>
                        </div>
                    </Route>
                    <Route path="/Backup/BackupRestauracion">
                    <div className="App">
                            <main>
                                <Nav />
                                <Restore/>
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
