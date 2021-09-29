import React, { Component } from 'react';
import Button from "@material-ui/core/Button"
import { FormControl, FormControlLabel, FormGroup, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Link } from 'react-router-dom';


export default class ClienteAdd extends Component {
    defaultName = "hola"
    defaultSecondName = "Si"
    defaultEmail = "si@si.si"
    defaultPhoneNum = "5555555555"
    defualtBalance = -5.5
    constructor(props) {
        super(props);
        this.state = {
            nombre_C: this.defaultName,
            balance: this.defualtBalance,
        }

        this.AddClient = this.AddClient.bind(this);
        this.getNameClient = this.getNameClient.bind(this);
        this.getbalance = this.getbalance.bind(this)
    }

    getNameClient(e) {
        this.setState({
            nombre_C: e.target.value,
        });
    }

    getbalance(e) {
        this.setState({
            balance: e.target.value,
        });
    }

    AddClient() {
        //console.log(this)
        const requiestClient = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre_C: this.state.nombre_C,
                balance: this.state.balance,
            }),
        };
        fetch("/cliente/crear-cliente", requiestClient)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    render() {
        return (
            <div>
                <Grid container spacing={5}>
                    <Grid item xs={12} align="center">
                        <Typography component="h4" variant="h4">
                            Agregar Cliente
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <FormHelperText>
                                Datos del Cliente
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container spacing={5} justifyContent="center" alignItems="center">
                        <Grid item xs={false}>
                            <FormControl>
                                <TextField
                                    id="NameClienttxt"
                                    onChange={this.getNameClient}
                                    label="Nombres"
                                    placeholder="Jesus Alonso"
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
                                    id="BalanceClienttxt"
                                    onChange={this.getbalance}
                                    label="Saldo"
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
                                Agregar Clinte
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
