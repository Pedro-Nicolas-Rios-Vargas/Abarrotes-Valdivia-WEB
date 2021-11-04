import React, { Component } from 'react';
import LabelError from '../LabelError';

export default class ClienteAdd extends Component {
    defaultName = ""
    defaultPhoneNum = ""
    constructor(props) {
        super(props);
        this.state = {
            provName: this.defaultName,
            provPhoneNum: this.defaultPhoneNum,
            errorNombre: "hidden",
            errorTelefono: "hidden",
            msmTelefono: "",
        }

        this.AddProv = this.AddProv.bind(this);
        this.getNameProv = this.getNameProv.bind(this);
        this.getprovPhoneNum = this.getprovPhoneNum.bind(this)
    }

    getNameProv(e) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ-\d\s]{0,32}$/.test(e.target.value)) {
            this.setState({
                provName: e.target.value,
                errorNombre: "hidden",
            });
        } else {
            this.setState({
                provName: this.state.provName,
            })
        }
    }

    getprovPhoneNum(e) {
        if (/^(\d{0,10})?$/.test(e.target.value)) {
            this.setState({
                provPhoneNum: e.target.value,
                errorTelefono: "hidden",
            });
        } else {
            this.setState({
                provPhoneNum: this.state.provPhoneNum,
            })
        }
    }

    AddProv() {
        //console.log(this)
        if (this.state.provName !== "" && this.state.provPhoneNum !== "") {
            if (this.state.provPhoneNum.length == 10) {
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

                alert("Proveedor agregado con exito");

                this.setState({
                    provName: "",
                    provPhoneNum: "",
                });
            } else {
                this.setState({
                    errorTelefono: "",
                    msmTelefono: "Por favor, ingrese un número de teléfono de 10 dígitos",
                });
            }
        } else {
            if (this.state.provName === "") {
                this.setState({
                    errorNombre: "",
                });
            }
            if (this.state.provPhoneNum === "") {
                this.setState({
                    errorTelefono: "",
                    msmTelefono: "Por favor, ingrese un número de teléfono",
                });
            }
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Agregar Proveedor
                    <small>Datos del Proveedor</small>
                </h2>
                <form>
                    <div className="group">
                        <LabelError visibility={this.state.errorNombre} msm={"Por favor, ingrese el nombre del proveedor"} />
                        <input type="text" required name="provName" value={this.state.provName} onChange={e => this.getNameProv(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>

                    <div className="group">
                        <LabelError visibility={this.state.errorTelefono} msm={this.state.msmTelefono} />
                        <input type="text" required name="provPhoneNum" value={this.state.provPhoneNum} onChange={e => this.getprovPhoneNum(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Teléfono</label>
                    </div>
                </form>
                <div className="footer">
                    <button className="btn" onClick={() => this.AddProv()} >Agregar</button>
                </div>
            </div>
        );
    }
}
