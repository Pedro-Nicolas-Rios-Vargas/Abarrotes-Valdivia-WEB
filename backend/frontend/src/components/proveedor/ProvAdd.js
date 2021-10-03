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
            <div>
                <Grid container spacing={5}>
                    <Grid item xs={12} align="center">
                        <Typography component="h4" variant="h4">
                            Agregar Proveedor
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <FormHelperText>
                                Datos del proveedor
                            </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid container spacing={5} justifyContent="center" alignItems="center">
                        <Grid item xs={false}>
                            <FormControl>
                                <TextField
                                    id="NameProvtxt"
                                    onChange={this.getNameProv}
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
                                    id="PhoneClienttxt"
                                    onChange={this.getprovPhoneNum}
                                    label="Telefono"
                                    placeholder="5555555555"
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
                                onClick={this.AddProv}>
                                Agregar Proveedor
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
