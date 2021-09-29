import React, { Component } from "react";

export default class ClientModi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            clientId: 0,
            nombre_C: "",
            balance: 0.0
        };
        this.getClientData = this.getClientData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.modiData = this.modiData.bind(this);
        this.applyChanges = this.applyChanges.bind(this);

        this.getclientId = this.getclientId.bind(this)
        this.getnombre_C = this.getnombre_C.bind(this)
        this.getbalance = this.getbalance.bind(this)
    }

    getclientId(value) {
        this.setState({
            clientId: value
       });
    }

    getnombre_C(value) {
        this.setState({
            nombre_C: value
       });
    }


    getbalance(value) {
        this.setState({
            balance: value
       });
    }

    getClientData() {
        fetch('/cliente/get-client')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    data: data
                });
            });
    }

    componentDidMount() {
        this.getClientData();
    }

    deleteData(clientId) {
        fetch('/cliente/delete-cliente/' + clientId, {
            method: 'DELETE',
            body: JSON.stringify(this.state),
        }).then(response => response)
            .then((data) => {
                if (data) {
                    this.getClientData();
                }
            });
    }

    modiData(clientId) {
        fetch('/cliente/update-cliente/' + clientId)
        .then(response => response.json())
        .then((data) => {
            //console.log(clientId)
            this.setState({
                clientId: clientId,
                nombre_C: data.nombre_C,
                balance: data.balance
            });
        });
        { this.setState({ show: true }) }
    }

    applyChanges(clientId) {
        const requiestClient = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId: this.state.clientId,
                nombre_C: this.state.nombre_C,
                balance: this.state.balance
            }),
        };
        fetch("/cliente/update-cliente/"+ clientId, requiestClient)
        .then((response) => response.json());
        { this.setState({ show: false }) }
    }

    render() {
        const clienData = this.state.data;
        const rows = clienData.map((clien) =>
            <tr key={clien.clientId}>
                <td>{clien.nombre_C}</td>
                <td>{clien.balance}</td>
                <td>
                    {/* <button onClick={() => this.deleteData(clien.clientId)} className="btn btn-delete" >Eliminar</button> */}
                    <button onClick={() => this.modiData(clien.clientId)} className="btn btn-modifi">Modificar</button>
                </td>
            </tr>
        );

        return (
            <div>
                <table className="tablaClientes">
                    <thead>
                        <tr>
                            <th className="head">Nombres</th>
                            <th className="head">Saldo</th>
                            <th className="head">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <div className="Modi">
                    <header className="Modi-header">
                        <div>
                            {
                                this.state.show ?
                                    <div>
                                        <div className="textBox">
                                            <input id='clientId' value={this.state.clientId} onChange={e => this.getclientId(e.target.value)} type="text" placeholder="ID" disabled></input>
                                            <input id='nombre_C' value={this.state.nombre_C} onChange={e => this.getnombre_C(e.target.value)} type="text" placeholder="Jesus Alonso"></input>
                                            <input id='balance' value={this.state.balance} onChange={e => this.getbalance(e.target.value)} type="text" placeholder="43.13"></input>
                                        </div>
                                        <div>
                                            <button onClick={() => this.applyChanges(this.state.clientId)} className="btn btn-applyChanges">Guardar Cambios</button>
                                        </div>
                                    </div> : null
                            }
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}