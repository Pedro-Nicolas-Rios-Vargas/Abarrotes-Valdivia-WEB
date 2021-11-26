import React, { Component } from "react";
import Modal from './ModalClient'
export default class ClientGet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataTable: [],
            show: false,
            clientId: 0,
            nombre_C: "",
            balance: 0.0,
            show: false,
            movement: [],
            dataMovement: [],
            cliente: "Pedro furro"
        };
        this.getClientData = this.getClientData.bind(this);
        this.deleteData = this.movementConsult.bind(this);
        this.modiData = this.modiData.bind(this);
        this.applyChanges = this.applyChanges.bind(this);

        this.getclientId = this.getclientId.bind(this)
        this.getnombre_C = this.getnombre_C.bind(this)
        this.getbalance = this.getbalance.bind(this)
        this.buscar = this.buscar.bind(this);
        this.setShow = this.setShow.bind(this);

        this.movementConsult = this.movementConsult.bind(this);

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
     * Metodo asincrono para obtener los datos movimientos de los clientes
     */
    async getMovementClientData() {
        fetch('/cuenta/get-movement')
        .then(response => response.json())
        .then((data) => {
            this.setState({
                dataMovement:data
            })
        });
    }
    /**
     * Si
     */
    componentDidMount() {
        this.getClientData();
        this.getMovementClientData();
    }
    /**
     * Metodo para consultar un movimiento
     * @param {int} clientId 
     */
    movementConsult(clientId) {
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
    /**
     * Metodo para modificar un usuario
     * @param {int} clientId 
     */
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
    /**
     * Metodo que aplica los cambios a la base de datos
     * @param {int} clientId 
     */
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
    /**
     * Metodo para buscar
     * @param {string} e 
     */
    buscar(e) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ\s]{0,43}$/.test(e.target.value)) {
            this.setState({ nombre_C: e.target.value });
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
            this.setState({ nombre_C: this.state.nombre_C });
        }
    }   
    /**
     * Si
     */
    setShow() {
        this.setState({show:false,})
    }
    /**
     * Metodo para consultar movimiento asincrono
     * @param {int} clientId 
     * @param {string} nombre_C 
     */
    async movementConsult(clientId, nombre_C) {
        const movementData = this.state.dataMovement;
        const movementMatch = [];
        console.log(clientId, nombre_C);

        for (let i = 0; i < movementData.length; i++) {
            const element = movementData[i];
            if (element.clientId === clientId) {
                const aux = {
                    movementId: element.movementId,
                    dateTransaction: element.dateTransaction,
                    total: element.total,
                }
                movementMatch.push(aux);
            }
        }
        this.setState({
            show:true,
            movement: movementMatch,
            cliente: nombre_C,
        })
    }
    /**
     * Metodo para renderizar la visa
     * @returns View
     */
    render() {
        const clienData = this.state.dataTable;
        const rows = clienData.map((clien) =>
            <tr key={clien.clientId}>
                <td className="child2" onClick={() => this.movementConsult(clien.clientId, clien.nombre_C)}>{clien.nombre_C}</td>
                <td className="child1" onClick={() => this.movementConsult(clien.clientId, clien.nombre_C)}>${clien.balance}</td>
            </tr>
        );

        const movementTable = this.state.movement;
        const tablaModal = movementTable.map((element) =>
            <tr key={element.movementId}>
                <td className="child2" >{element.dateTransaction}</td>
                <td className="child1" >${element.total}</td>
            </tr>
        );

        return (
            <div className="container">
                <h2>Buscar Cliente
                </h2>
                <form>
                    <div className="group">
                        <input type="text" value={this.state.nombre_C} required onChange={e => this.buscar(e)}/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>
                </form>

                <table className="table">
                    <thead>
                        <tr>
                            <th className="head">Nombres</th>
                            <th className="head1">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <Modal title={"Cuenta de " + this.state.cliente} onClose={() => this.setShow(false)} show={this.state.show}>
                <div >
                <table className="table">
                    <thead>
                        <tr>
                            <th className="head1">Fecha</th>
                            <th className="head1">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tablaModal}
                    </tbody>
                </table>
                </div>
                </Modal>
            </div>
        );
    }
}