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
            <div>
                <Grid container spacing={5}>
                    <Grid item xs={12} align="center">
                        <Typography component="h4" variant="h4">
                            Agregar Producto
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <FormHelperText>
                                <div align='center'>
                                    Datos del Producto
                                </div>
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container spacing={1} justifyContent="center" align="center">
                        <Grid item xs={false} margin={12}>
                            <FormControl>
                                <TextField
                                    id="IDtxt"
                                    onChange={this.getprodId}
                                    label="Codigo de barras"
                                    placeholder="9786075487267"
                                    multiline
                                    variant="outlined">
                                </TextField>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={5} justifyContent="center" alignItems="center">
                        <Grid item xs={false}>
                            <FormControl>
                                <TextField
                                    id="productNametxt"
                                    onChange={this.getNameProducto}
                                    label="Nombre"
                                    placeholder="Principes"
                                    multiline
                                    variant="outlined">
                                </TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={false}>
                            <FormControl>
                                <TextField
                                    id="buytxt"
                                    onChange={this.getexistencia}
                                    label="Existencia"
                                    placeholder="12"
                                    multiline
                                    variant="outlined">
                                </TextField>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} justifyContent="center" align="center">
                        <Grid item xs={false} margin={12}>
                            <FormControl>
                                <TextField
                                    id="stocktxt"
                                    onChange={this.getstock}
                                    label="Stock"
                                    placeholder="13"
                                    multiline
                                    variant="outlined">
                                </TextField>
                            </FormControl>
                        </Grid>
                    </Grid>
                    

                    <Grid container spacing={1} justifyContent="center" align="center">
                        <Grid item xs={false}>
                            <FormControl>
                                <TextField
                                    id="Presentaciontxt"
                                    onChange={this.getpresentacion}
                                    label="Presentacion"
                                    placeholder="Unidad de medida"
                                    multiline
                                    variant="outlined">
                                </TextField>
                            </FormControl>
                        </Grid>
                        <p>Cambiar esta cosas por un spinner o algo asi</p>
                        <p>Ya que solo esta Unidad y Kilogramo</p>
                        <h3>Aparte de que se tiene que mandar 1 o 2 dependiendo de lo elegido</h3>
                        <h3>O si no cambiar el modelo</h3>
                        <Grid item xs={false}>
                            <FormControl>
                                <TextField
                                    id="sellPriceClienttxt"
                                    onChange={this.getsellPrice}
                                    label="Precio de venta"
                                    type="number"
                                    placeholder="-89.50"
                                    multiline
                                    variant="outlined">
                                </TextField>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} justifyContent="center" align="center">
                        <Grid item xs={false}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.AddClient}>
                                Agregar Producto
                            </Button>
                        </Grid>

                        <Grid item xs={false}>
                            <Button
                                color="secondary"
                                variant="contained"
                                to="/"
                                component={Link}>
                                Regresar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}