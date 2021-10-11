import React, { Component } from 'react';


export default class ClienteAdd extends Component {
    defaultName = "hola"
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
    }

    render() {
        return (
            <div className="container">
                <h1>Pene</h1>
                <h2>Agregar Cliente
                    <small>Datos del cliente</small>
                </h2>

                <form>
                    <div className="group">
                        <input type="text" required onChange={e => this.getNameClient(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>

                    <div className="group">
                        <input type="text" required onChange={e => this.getbalance(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Saldo</label>
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
