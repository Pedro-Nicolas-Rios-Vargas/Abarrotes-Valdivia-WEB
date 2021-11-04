import React, { Component } from 'react';
import LabelError from '../LabelError';


export default class ClienteAdd extends Component {
    defaultName = ""
    defualtBalance = ""
    constructor(props) {
        super(props);
        this.state = {
            nombre_C: this.defaultName,
            balance: this.defualtBalance,
            labelErrorVisibilityCliente: "hidden",
        }

        this.AddClient = this.AddClient.bind(this);
        this.getNameClient = this.getNameClient.bind(this);
        this.getbalance = this.getbalance.bind(this)
    }

    getNameClient(e) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ\s]{0,43}$/.test(e.target.value)) {
            this.setState({
                nombre_C: e.target.value,
                labelErrorVisibilityCliente: "hidden",
            });

        } else {
            this.setState({
                nombre_C: this.state.nombre_C,
                labelErrorVisibilityCliente: "hidden",
            })
        }
    }

    getbalance(e) {
        if (/^([-]?\d{0,4})([.]\d{0,2})?$/.test(e.target.value)) {
            this.setState({
                balance: e.target.value,
            });
        } else {
            this.setState({
                balance: this.state.balance,
            })
        }
    }

    AddClient() {
        //console.log(this)
        if (this.state.nombre_C !== "" && this.state.balance !== "") {
            console.log(this.state.nombre_C)
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
            alert("Se agrego el cliente")
            this.setState({
                nombre_C: "",
                balance: "",
            })
        } else {
            if (this.state.nombre_C !== "") {
                const requiestClient = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre_C: this.state.nombre_C,
                        balance: 0,
                    }),
                };
                fetch("/cliente/crear-cliente", requiestClient)
                    .then((response) => response.json())
                    .then((data) => console.log(data));
                alert("Se agrego el cliente")
                this.setState({
                    nombre_C: "",
                    balance: "",
                })
            } else {
                this.setState({
                    labelErrorVisibilityCliente: "",
                });
            }
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Agregar Cliente
                    <small>Datos del cliente</small>
                </h2>

                <form>
                    <div className="group">
                        <LabelError visibility={this.state.labelErrorVisibilityCliente} msm={"Por favor, ingrese el nombre del cliente"} />
                        <input type="text" name="nombre_C" value={this.state.nombre_C} required onChange={e => this.getNameClient(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>

                    <div className="group">
                        <input type="text" name="balance" value={this.state.balance} required onChange={e => this.getbalance(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Saldo</label>
                    </div>

                </form>
                <div className="footer">
                    <button className="btn" onClick={() => this.AddClient()}>Agregar</button>
                </div>
            </div>
        );
    }
}
