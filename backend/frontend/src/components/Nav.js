import React, { Component } from 'react';
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
            msg: '',
            collapsed: false,
            rotulo: 'Inicio',
        };

        this.showingMenu = this.showingMenu.bind(this);
        this.logout = this.logout.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
    }
    toggleMenu = (event) => {
        let sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("close");
        //this.setState({
        //    collapsed: !this.state.collapsed,
        //})
    }

    changeRotulo = (rotulo) => {
        this.setState({
            rotulo: rotulo,
        });
    }

    showingMenu(event) {
        let arrowParent = event.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
    }

    logout() {
        let request = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "Logged": false
            }),
        };
        fetch('/logout/', request).
            then((response) => {
                return response.json();
            }).
            then((data) => {
                this.setState({
                    msg: data.Mensaje,
                });
            });
    }

    responseHandler() {
        let msg = this.state.msg;
        if (msg == 'Salir') {
            return <Redirect to="/"/>
        } else if (msg) {
            return <p>Issa porra</p>
        }
    }

    render() {
        let afterResponse = this.responseHandler();
        return (
                <div>
                    { afterResponse }
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
                                    <i
                                        className='bx bxs-chevron-down arrow'
                                        onClick={e => this.showingMenu(e) } >
                                    </i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name">Clientes</a></li>
                                    <Link to="/cliente/add"><li onClick={() =>this.changeRotulo("Cliente")}>Agregar</li></Link>
                                    {/* <li><a href="#">Agregar</a></li> */}
                                    <Link to="/cliente/consultar"><li onClick={() =>this.changeRotulo("Cliente")}>Buscar</li></Link>
                                    <Link to="/cliente/modificar"><li onClick={() =>this.changeRotulo("Cliente")}>Modificar</li></Link>
                                    <Link to="/cliente/eliminar"><li onClick={() =>this.changeRotulo("Cliente")}>Eliminar</li></Link>
                                </ul>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <a href="#">
                                        <i className='bx bxs-truck' ></i>
                                        <span className="link_name">Proveedores</span>
                                    </a>
                                    <i
                                        className='bx bxs-chevron-down arrow'
                                        onClick={e => this.showingMenu(e) } >
                                    </i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Proveedores</a></li>
                                    <Link to="/proveedor/agregar"><li onClick={() =>this.changeRotulo("Proveedores")}>Agregar</li></Link>
                                    <Link to="/proveedor/consultar"><li onClick={() =>this.changeRotulo("Proveedores")}>Buscar</li></Link>
                                    <Link to="/proveedor/modificar"><li onClick={() =>this.changeRotulo("Proveedores")}>Modificar</li></Link>
                                    <Link to="/proveedor/eliminar"><li onClick={() =>this.changeRotulo("Proveedores")}>Eliminar</li></Link>
                                </ul>
                            </li>

                            <li>
                                <div className="iocn-link">
                                    <a href="#">
                                        <i className='bx bx-money' ></i>
                                        <span className="link_name">Ventas</span>
                                    </a>
                                    <i
                                        className='bx bxs-chevron-down arrow'
                                        onClick={e => this.showingMenu(e) } >
                                    </i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Ventas</a></li>
                                    <Link to="/venta/agregar"><li onClick={() =>this.changeRotulo("Ventas")}>Agregar</li></Link>
                                    <Link to="/venta/consultar"><li onClick={() =>this.changeRotulo("Ventas")}>Buscar</li></Link>
                                </ul>
                            </li>

                            <li>
                                <div className="iocn-link">
                                    <a href="#">
                                        <i className='bx bx-cart' ></i>
                                        <span className="link_name">Compras</span>
                                    </a>
                                    <i
                                        className='bx bxs-chevron-down arrow'
                                        onClick={e => this.showingMenu(e) } >
                                    </i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Compras</a></li>
                                    <Link to="/compras/agregar"><li onClick={() =>this.changeRotulo("Compras")}>Agregar</li></Link>
                                    <Link to="/compras/consultar"><li onClick={() =>this.changeRotulo("Compras")}>Buscar</li></Link>
                                </ul>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <a href="#">
                                        <i className='bx bx-coffee'></i>
                                        <span className="link_name">Productos</span>
                                    </a>
                                    <i
                                        className='bx bxs-chevron-down arrow'
                                        onClick={e => this.showingMenu(e) } >
                                    </i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Productos</a></li>
                                    <Link to="/producto/agregar"><li onClick={() =>this.changeRotulo("Productos")}>Agregar</li></Link>
                                    <Link to="/producto/consultar"><li onClick={() =>this.changeRotulo("Productos")}>Buscar</li></Link>
                                    <Link to="/producto/modificar"><li onClick={() =>this.changeRotulo("Productos")}>Modificar</li></Link>
                                    <Link to="/producto/eliminar"><li onClick={() =>this.changeRotulo("Productos")}>Eliminar</li></Link>
                                </ul>
                            </li>

                            {/* <li>
                                <a href="#">
                                    <i className='bx bx-line-chart' ></i>
                                    <span className="link_name">Reportes</span>
                                </a>
                                <ul className="sub-menu blank">
                                    <li><a className="link_name" href="#">Reporte Ventas</a></li>
                                    <li><a className="link_name" href="#">Reporte Productos</a></li>
                                </ul>
                            </li> */}
                            <li>
                                <div className="iocn-link">
                                    <a href="#">
                                        <i className='bx bx-line-chart'></i>
                                        <span className="link_name">Reportes</span>
                                    </a>
                                    <i
                                        className='bx bxs-chevron-down arrow'
                                        onClick={e => this.showingMenu(e) } >
                                    </i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Reportes</a></li>
                                    <Link to="/#"><li onClick={() =>this.changeRotulo("Reportes")}>Ventas</li></Link>
                                    <Link to="/#"><li onClick={() =>this.changeRotulo("Reportes")}>Productos</li></Link>
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
                                    <li><a href="/#">Respaldos</a></li>
                                    <li><a href="/#">Restauraciones</a></li>
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
                                    <i
                                        className='bx bx-log-out'
                                        onClick={() => this.logout()} >
                                    </i>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">
                            <i className='bx bx-menu' onClick={ (e) => this.toggleMenu(e) }></i>
                            <span className="text">{this.state.rotulo}</span>
                            {/* Ver si se puede cambiar inicio dependiendo de donde este */}
                        </div>
                    </section>
                </div>
        );
    }
}

