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
            clientName: this.defaultName,
            clientSecondName: this.defaultSecondName,
            clientEmail: this.defaultEmail,
            clientPhoneNum: this.defaultPhoneNum,
            balance: this.defualtBalance,
        }

        this.AddClient = this.AddClient.bind(this);
        this.getNameClient = this.getNameClient.bind(this);
        this.getclientSecondName = this.getclientSecondName.bind(this);
        this.getclientEmail = this.getclientEmail.bind(this);
        this.getclientPhoneNum = this.getclientPhoneNum.bind(this)
        this.getbalance = this.getbalance.bind(this)
    }

    getNameClient(e) {
        this.setState({
            clientName: e.target.value,
        });
    }

    getclientSecondName(e) {
        this.setState({
            clientSecondName: e.target.value,
        });
    }

    getclientEmail(e) {
        this.setState({
            clientEmail: e.target.value,
        });
    }

    getclientPhoneNum(e) {
        this.setState({
            clientPhoneNum: e.target.value,
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
                clientName: this.state.clientName,
                clientSecondName: this.state.clientSecondName,
                clientEmail: this.state.clientEmail,
                clientPhoneNum: this.state.clientPhoneNum,
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
                                <div align='center'>
                                    Datos del Cliente
                                </div>
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
                        <Grid item xs={false}>
                            <FormControl>
                                <TextField
                                    id="LastNameClienttxt"
                                    onChange={this.getclientSecondName}
                                    label="Apellides"
                                    placeholder="Perez Guerra"
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
                                    id="EmailClienttxt"
                                    onChange={this.getclientEmail}
                                    label="Correo Electronico"
                                    placeholder="ejemplo@ejemplo.com"
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
                                    id="PhoneClienttxt"
                                    onChange={this.getclientPhoneNum}
                                    label="Telefono"
                                    placeholder="5555555555"
                                    multiline
                                    variant="outlined">
                                </TextField>
                            </FormControl>
                        </Grid>
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
