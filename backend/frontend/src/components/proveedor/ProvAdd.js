import React, { Component } from 'react';
import Button from "@material-ui/core/Button"
import { FormControl, FormControlLabel, FormGroup, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default class ClienteAdd extends Component {
    defaultName = "hola"
    defaultPhoneNum = "5555555555"
    constructor(props) {
        super(props);
        this.state = {
            provName: this.defaultName,
            provPhoneNum: this.defaultPhoneNum,
        }

        this.AddProv = this.AddProv.bind(this);
        this.getNameProv = this.getNameProv.bind(this);
        this.getprovPhoneNum = this.getprovPhoneNum.bind(this)
    }

    getNameProv(e) {
        this.setState({
            provName: e.target.value,
        });
    }

    getprovPhoneNum(e) {
        this.setState({
            provPhoneNum: e.target.value,
        });
    }

    AddProv() {
        //console.log(this)
        const requiestClient = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                provName: this.state.provName,
                provPhoneNum: this.state.provPhoneNum,
            }),
        };
        fetch("/proveedor/add-proveedor", requiestClient)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    render() {
        return (
            <div className="container">
                <h2>Agregar Proveedor
                    <small>Datos del Proveedor</small>
                </h2>
                <form>
                    <div className="group">
                        <input type="text" required onChange={e => this.getNameProv(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>

                    <div className="group">
                        <input type="text" required onChange={e => this.getprovPhoneNum(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Telefono</label>
                    </div>
                </form>
                <div className="footer">
                    <button className="btn" onClick={() => this.AddClient()} >Agregar</button>
                </div>
            </div>
        );
    }
}