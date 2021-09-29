import React, { Component } from 'react';
require("../components/style.css")
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    toggleMenu = () => {
        console.log("Si entro la pendejada")
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    render() {
        return (
                <div>
                    <div className="sidebar close">
                        <div className="logo-details">
                            <i className='bx bx-store' ></i>
                            <span className="logo_name">Abarrotes Valdivia</span>
                        </div>
                        <ul className="nav-links">

                            <li>
                                <div className="iocn-link">
                                    <a>
                                        <i className='bx bx-user-circle' ></i>
                                        <span className="link_name">Clientes</span>
                                    </a>
                                    <i className='bx bxs-chevron-down arrow' ></i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name">Clientes</a></li>
                                    <Link to="/cliente/add"><li>Agregar</li></Link>
                                    {/* <li><a href="#">Agregar</a></li> */}
                                    <Link to="/cliente/consultar"><li>Buscar</li></Link>
                                    <Link to="/cliente/modificar"><li>Modificar</li></Link>
                                    <Link to="/cliente/eliminar"><li>Eliminar</li></Link>
                                </ul>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <a href="#">
                                        <i className='bx bxs-truck' ></i>
                                        <span className="link_name">Proveedores</span>
                                    </a>
                                    <i className='bx bxs-chevron-down arrow' ></i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Proveedores</a></li>
                                    <Link to="/proveedor/agregar"><li>Agregar</li></Link>
                                    <Link to="/proveedor/consultar"><li>Buscar</li></Link>
                                    <Link to="/proveedor/modificar"><li>Modificar</li></Link>
                                    <Link to="/proveedor/eliminar"><li>Eliminar</li></Link>
                                </ul>
                            </li>

                            <li>
                                <div className="iocn-link">
                                    <a href="#">
                                        <i className='bx bx-money' ></i>
                                        <span className="link_name">Ventas</span>
                                    </a>
                                    <i className='bx bxs-chevron-down arrow' ></i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Ventas</a></li>
                                    <Link to="/venta/agregar"><li>Agregar</li></Link>
                                    <li><a href="#">Buscar</a></li>
                                </ul>
                            </li>

                            <li>
                                <div className="iocn-link">
                                    <a href="#">
                                        <i className='bx bx-cart' ></i>
                                        <span className="link_name">Compras</span>
                                    </a>
                                    <i className='bx bxs-chevron-down arrow' ></i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Compras</a></li>
                                    <li><a href="#">Agregar</a></li>
                                    <li><a href="#">Buscar</a></li>
                                </ul>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <a href="#">
                                        <i className='bx bx-coffee'></i>
                                        <span className="link_name">Productos</span>
                                    </a>
                                    <i className='bx bxs-chevron-down arrow' ></i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Productos</a></li>
                                    <Link to="/producto/agregar"><li>Agregar</li></Link>
                                    <Link to="/producto/consultar"><li>Buscar</li></Link>
                                    <Link to="/producto/modificar"><li>Modificar</li></Link>
                                    <Link to="/producto/eliminar"><li>Eliminar</li></Link>
                                </ul>
                            </li>

                            <li>
                                <a href="#">
                                    <i className='bx bx-line-chart' ></i>
                                    <span className="link_name">Reportes</span>
                                </a>
                                <ul className="sub-menu blank">
                                    <li><a className="link_name" href="#">Reportes</a></li>
                                </ul>
                            </li>

                            <li>
                                <div className="iocn-link">
                                    <a href="#">
                                        <i className='bx bx-coffee'></i>
                                        <span className="link_name">Backups</span>
                                    </a>
                                    <i className='bx bxs-chevron-down arrow' ></i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Backups</a></li>
                                    <li><a href="#">Respaldos</a></li>
                                    <li><a href="#">Restauraciones</a></li>
                                </ul>
                            </li>

                            <li>
                                <div className="profile-details">
                                    <div className="profile-content">
                                        <img src="images.jpg" alt="profileImg" />
                                    </div>
                                    <div className="name-job">
                                        <div className="profile_name">Rex</div>
                                        <div className="job">Desarrollador</div>
                                    </div>
                                    <i className='bx bx-log-out' ></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">
                            <i className='bx bx-menu' onClick={() => this.toggleMenu()}></i>
                            <span className="text">Inicio</span>
                        </div>
                    </section>
                </div>
        );
    }
}

