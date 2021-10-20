import React, { Component } from "react";

export default class ClienteDelete extends Component {
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
    

        this.getclientId = this.getclientId.bind(this);
        this.getnombre_C = this.getnombre_C.bind(this);
        this.getbalance = this.getbalance.bind(this);

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

    deleteData(clientId, nombre_C, balance) {
        console.log(balance)
        if(balance === "0.00") {
            if (confirm("Desea eliminar al cliente: " + "  " + nombre_C)) {
                fetch('/cliente/delete-cliente/' + clientId, {
                    method: 'DELETE',
                    body: JSON.stringify(this.state),
                }).then(response => response)
                .then((data) => {
                    if (data) {
                        this.getClientData();
                    }
                });
                alert("Cliente eliminado con exito");
                this.setState({buscador: ""});
            }
        } else {
            alert("No se puede eliminar un cliente con saldo deudor o acredor.")
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
                <td onClick={() => this.deleteData(clien.clientId, clien.nombre_C, clien.balance)} >{clien.nombre_C}</td>
                <td onClick={() => this.deleteData(clien.clientId, clien.nombre_C, clien.balance)} >{clien.balance}</td>
            </tr>
        );

        return (
            <div className="container">
                <h2>Eliminar Cliente
                </h2>
                <form>
                    <div className="group">
                        <input type="text" required value={this.state.buscador} onChange={e => this.getBuscador(e)} />
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
            </div>
        );
    }
}