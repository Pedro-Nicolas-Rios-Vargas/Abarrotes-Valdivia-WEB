import React, { Component } from "react";
/**
 * Clase cliente eliminar
 */
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
    /**
     * Metodo que obtiene el valor deseado a buscar
     * @param {objeto} e 
     */
    getBuscador(e) {
        this.setState({
            buscador: e.target.value,
        });
        this.buscar(e);
    }
    /**
     *  Metodo que obtiene el id
     * @param {objeto} value 
     */
    getclientId(value) {
        this.setState({
            clientId: value
       });
    }
    /**
     * Metodo que obtiene el nombre
     * @param {objeto} value 
     */
    getnombre_C(value) {
        this.setState({
            nombre_C: value
       });
    }
    /**
     * Metodo que obtiene el balance
     * @param {objeto} value 
     */
    getbalance(value) {
        this.setState({
            balance: value
       });
    }

    /**
     * Metodo que recibe los datos de los cliente en la base de datos
     */
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
    /**
     * Si
     */
    componentDidMount() {
        this.getClientData();
    }
    /**
     * Metodo que elimina los datos de un cliente directamente en la base de datos
     * @param {int} clientId 
     * @param {string} nombre_C 
     * @param {float} balance 
     */
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
    /**
     * Metodo que busca por el nombre
     * @param {string} e 
     */
    buscar(e) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ\s]{0,43}$/.test(e.target.value)) {
            this.setState({ buscador: e.target.value });
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
        } else {
            this.setState({ buscador: this.state.buscador });
        }
    }
    /**
     * Metodo para renderizar la visa
     * @returns View
     */
    render() {
        const clienData = this.state.dataTable;
        const rows = clienData.map((clien) =>
            <tr key={clien.clientId}>
                <td className="child2" onClick={() => this.deleteData(clien.clientId, clien.nombre_C, clien.balance)} >{clien.nombre_C}</td>
                <td  className="child1"onClick={() => this.deleteData(clien.clientId, clien.nombre_C, clien.balance)} >${clien.balance}</td>
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
                            <th className="head1">Saldo</th>
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