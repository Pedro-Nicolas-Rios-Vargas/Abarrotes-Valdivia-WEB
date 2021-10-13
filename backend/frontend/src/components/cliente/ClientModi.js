import React, { Component } from "react";

export default class ClientModi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataTable: [],
            show: false,
            clientId: 0,
            nombre_C: "",
            balance: 0.0,
            buscador: ""
        };
        this.getClientData = this.getClientData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.modiData = this.modiData.bind(this);
        this.applyChanges = this.applyChanges.bind(this);

        this.getclientId = this.getclientId.bind(this)
        this.getnombre_C = this.getnombre_C.bind(this)
        this.getbalance = this.getbalance.bind(this)

        this.buscar = this.buscar.bind(this);
        this.getBuscador = this.getBuscador.bind(this);
    }

    getBuscador(e) {
        this.setState({
            buscador: e.target.value,
        });
        this.buscar(e);
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
        if (/^([-]?\d*)([.]\d{0,2})?$/.test(value)) {
            this.setState({
                balance: value,
            });
        } else {
            this.setState({
                balance: this.state.balance,
            })
        }
        if(this.state.balance.length === 1) {
        }
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
        if (this.state.nombre_C !== "" && this.state.balance !== "") {
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
                .then((response) => {
                    this.getClientData();
                });
            { this.setState({ 
                show: false,
                buscador: "",
             }); 
            }
            alert("Datos del cliente modificados con exito")
        } else {
            alert("No se puede agregar un cliente sin nombre o sin saldo")
        }
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
                        <input type="text" required value={this.state.buscador} onChange={e => this.getBuscador(e)}/>
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