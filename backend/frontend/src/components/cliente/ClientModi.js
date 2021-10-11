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
        fetch("/cliente/update-cliente/" + clientId, requiestClient)
            .then((response) => response.json());
        { this.setState({ show: false }) }
    }

    render() {
        const clienData = this.state.data;
        const rows = clienData.map((clien) =>
            <tr key={clien.clientId}>
                <td className="tableResponse" onClick={() => this.modiData(clien.clientId)}>{clien.nombre_C}</td>
                <td className="tableResponse" onClick={() => this.modiData(clien.clientId)}>{clien.balance}</td>
            </tr>
        );

        return (
            <div className="container">
                <h2>Modificar Cliente
                </h2>
                <form>
                    <div className="group">
                        <input type="text" required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="head">Nombre</th>
                            <th className="head">Saldo</th>
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
                                        <form>
                                            <div className="group">
                                                {/* <input id='clientId' value={this.state.clientId} onChange={e => this.getclientId(e.target.value)} type="text" placeholder="ID" disabled></input> */}
                                                <input id='nombre_C' value={this.state.nombre_C}
                                                    onChange={e => this.getnombre_C(e.target.value)}
                                                    type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Nombre</label>
                                            </div>

                                            <div className="group">
                                                <input id='balance' value={this.state.balance}
                                                    onChange={e => this.getbalance(e.target.value)}
                                                    type="text" required></input>
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Saldo</label>
                                            </div>
                                            <div className="footer">
                                                <button onClick={() => this.applyChanges(this.state.clientId)} className="btn">Guardar Cambios</button>
                                            </div>

                                        </form>
                                    </div> : null
                            }
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}