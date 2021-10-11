import React, { Component } from 'react';
import Button from "@material-ui/core/Button"
import { FormControl, FormControlLabel, FormGroup, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default class ProductoAdd extends Component {
    defaultName = "hola"
    defaultSecondName = -5.5
    defaultStock = 0
    defaultpresentacion = "Empaquetado"
    defualtsellPrice = -5.5
    defaultId = "9786075487267"
    constructor(props) {
        super(props);
        this.state = {
            prodName: this.defaultName,
            existencia: this.defaultSecondName,
            stock: this.defaultStock,
            presentacion: this.defaultpresentacion,
            sellPrice: this.defualtsellPrice,
            prodId: this.defaultId,
        }

        this.AddClient = this.AddClient.bind(this);
        this.getNameProducto = this.getNameProducto.bind(this);
        this.getexistencia = this.getexistencia.bind(this);
        this.getstock = this.getstock.bind(this);
        this.getpresentacion = this.getpresentacion.bind(this)
        this.getsellPrice = this.getsellPrice.bind(this)
        this.getprodId = this.getprodId.bind(this);
    }

    getprodId(e) {
        this.setState({
            prodId: e.target.value,
        });
    }

    getNameProducto(e) {
        this.setState({
            prodName: e.target.value,
        });
    }

    getexistencia(e) {
        this.setState({
            existencia: e.target.value,
        });
    }

    getstock(e) {
        this.setState({
            stock: e.target.value,
        });
    }

    getpresentacion(e) {
        this.setState({
            presentacion: e.target.value,
        });
    }

    getsellPrice(e) {
        this.setState({
            sellPrice: e.target.value,
        });
    }

    AddClient() {
        //console.log(this)
        const requiestProducto = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prodId: this.state.prodId,
                prodName: this.state.prodName,
                existencia: this.state.existencia,
                stock: this.state.stock,
                presentacion: this.state.presentacion,
                sellPrice: this.state.sellPrice,
            }),
        };
        fetch("/producto/add-producto", requiestProducto)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    render() {
        return (
            <div className="container">
            <h2>Agregar Producto
                <small>Datos del Producto</small>
            </h2>

            <form>
                <div className="group">
                    <input type="text" required onChange={e => this.getNameProducto(e)} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Nombre</label>
                </div>

                <div className="group">
                    <input type="text" required onChange={e => this.getexistencia(e)} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Existencia</label>
                </div>

                <div className="group">
                    <input type="text" required onChange={e => this.getstock(e)} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>stock</label>
                </div>

                <div className="group">
                    <input type="text" required onChange={e => this.getpresentacion(e)} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>presentacion</label>
                </div>

                <div className="group">
                    <input type="text" required onChange={e => this.getsellPrice(e)} />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Precio</label>
                </div>
            </form>
            <div className="footer">
                <button className="btn" onClick={() => this.AddClient()} >Agregar</button>
                <button className="btn back">Regresar</button>
            </div>
        </div>
        );
    }
}