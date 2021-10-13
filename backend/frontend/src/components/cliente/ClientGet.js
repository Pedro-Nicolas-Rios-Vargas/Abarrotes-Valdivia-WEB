import React, { Component } from "react";

export default class ClientGet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataTable: [],
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
        this.buscar = this.buscar.bind(this);
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
                    data: data,
                    dataTable: data,
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
                //console.log(data)
                this.setState({
                    clientId: data.clientId,
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
        console.log(clientId);
        fetch("/cliente/update-cliente/" + clientId, requiestClient)
            .then((response) => response.json())
            .then((data) => console.log(data));
        { this.setState({ show: false }) }
    }

    buscar(e) {
        const nombre = e.target.value.toLowerCase();
        const auxData = []
        for (let i = 0; i < this.state.data.length; i++) {
            const element = this.state.data[i];
            const str = element.nombre_C.toLowerCase();
            if (str.includes(nombre)) {
                auxData.push(element);    
            }
        }
        this.setState({
            dataTable: auxData,
        });
    }

    render() {
        const clienData = this.state.dataTable;
        const rows = clienData.map((clien) =>
            <tr key={clien.clientId}>
                <td>{clien.nombre_C}</td>
                <td>{clien.balance}</td>
                <td>
                    {/* <button onClick={() => this.deleteData(clien.clientId)} className="btn btn-delete" >Eliminar</button>
                    <button onClick={() => this.modiData(clien.clientId)} className="btn btn-modifi">Modificar</button> */}
                </td>
            </tr>
        );

        return (
            <div className="container">
                <h2>Buscar Cliente
                </h2>
                <form>
                    <div className="group">
                        <input type="text" required onChange={e => this.buscar(e)}/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>
                </form>

                <table className="table">
                    <thead>
                        <tr>
                            <th className="head">Nombres</th>
                            <th className="head">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}