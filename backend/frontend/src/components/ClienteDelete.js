import React, { Component } from "react";

export default class ClienteDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            clientId: 0,
            clientName: "",
            clientSecondName: "",
            clientEmail: "",
            clientPhoneNum: "",
            balance: 0.0
        };
        this.getClientData = this.getClientData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.modiData = this.modiData.bind(this);
        this.applyChanges = this.applyChanges.bind(this);

        this.getclientId = this.getclientId.bind(this)
        this.getClientName = this.getClientName.bind(this)
        this.getclientSecondName = this.getclientSecondName.bind(this)
        this.getclientEmail = this.getclientEmail.bind(this)
        this.getclientPhoneNum = this.getclientPhoneNum.bind(this)
        this.getbalance = this.getbalance.bind(this)
    }

    getclientId(value) {
        this.setState({
            clientId: value
       });
    }

    getClientName(value) {
        this.setState({
            clientName: value
       });
    }

    getclientSecondName(value) {
        this.setState({
            clientSecondName: value
       });
    }

    getclientEmail(value) {
        this.setState({
            clientEmail: value
       });
    }

    getclientPhoneNum(value) {
        this.setState({
            clientPhoneNum: value
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
                clientName: data.clientName,
                clientSecondName: data.clientSecondName,
                clientEmail: data.clientEmail,
                clientPhoneNum: data.clientPhoneNum,
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
                clientName: this.state.clientName,
                clientSecondName: this.state.clientSecondName,
                clientEmail: this.state.clientEmail,
                clientPhoneNum: this.state.clientPhoneNum,
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
                <td>{clien.clientName}</td>
                <td>{clien.clientSecondName}</td>
                <td>{clien.clientEmail}</td>
                <td>{clien.clientPhoneNum}</td>
                <td>{clien.balance}</td>
                <td>
                    <button onClick={() => this.deleteData(clien.clientId)} className="btn btn-delete" >Eliminar</button>
                    {/* <button onClick={() => this.modiData(clien.clientId)} className="btn btn-modifi">Modificar</button> */}
                </td>
            </tr>
        );

        return (
            <div>
                <table className="tablaClientes">
                    <thead>
                        <tr>
                            <th className="head">Nombres</th>
                            <th className="head">Apellides</th>
                            <th className="head">Correo Electronico</th>
                            <th className="head">Telefono</th>
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
                                            <input id='clientName' value={this.state.clientName} onChange={e => this.getClientName(e.target.value)} type="text" placeholder="Jesus Alonso"></input>
                                            <input id='clientSecondName' value={this.state.clientSecondName} onChange={e => this.getclientSecondName(e.target.value)} type="text" placeholder="Perez Guerra"></input>
                                            <input id='clientEmail' value={this.state.clientEmail} onChange={e => this.getclientEmail(e.target.value)} type="text" placeholder="example@example.com"></input>
                                            <input id='clientPhoneNum' value={this.state.clientPhoneNum} onChange={e => this.getclientPhoneNum(e.target.value)} type="text" placeholder="5555555555"></input>
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