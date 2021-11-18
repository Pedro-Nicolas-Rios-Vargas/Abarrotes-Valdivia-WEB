import React, { Component, useState } from "react";
import Modal from './ModalSell'

export default class ProvGet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordData: [],
            logData: [],
            dataProduct: [],
            dataCliente: [],
            tablaDetallada: [],
            existencia: 0,
            sellPrice: 0.0,
            stock: 0,
            presentacion: "",
            show: false,
            fecha: "",
            nombre_C: "",
        };
        this.getSellLogData = this.getSellLogData.bind(this);
        this.getSellRecordData = this.getSellRecordData.bind(this);
        this.getDataProduct = this.getDataProduct.bind(this);
        this.getClientData = this.getClientData.bind(this);
        this.componentDidMount =  this.componentDidMount.bind(this);
        this.setShow = this.setShow.bind(this);
        this.openModal = this.openModal.bind(this);

        this.buscarFecha = this.buscarFecha.bind(this);
        this.buscar = this.buscar.bind(this);
    }
    
    
    async getDataProduct() {
        await fetch('/producto/get-producto')
        .then(response => response.json())
        .then((data) => {
            this.setState({
                dataProduct: data,
            });
        });
    }

    async getSellLogData() {
        await fetch('/sellLog/get-sellLog')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    logData: data
                });
            });
    }
    async getClientData() {
        await fetch('/cliente/get-client')
        .then(response => response.json())
        .then((data) => {
            this.setState({
                dataCliente: data
            });
        });
    }

    async getSellRecordData() {
        await fetch('/sellRecord/get-sellRecord')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    recordData: data
                });
            });
    }

    setShow(){
        this.setState({show: false,})
    }

    async openModal(sellId){
        const logData = this.state.logData;
        let encontrado = false;
        const dataproduct = this.state.dataProduct;
        const tablaDetallada = [];
        let aux = [];
        for (let i = 0; i < logData.length; i++) {
            const element = logData[i];
            console.log(element.sellId, sellId)
            if (element.sellId === sellId) {
                console.log(element)
                const product = dataproduct.find(dataproduct => dataproduct.prodId === element.prodId);
                    aux = {
                        prodId: product.prodId,
                        prodName: product.prodName,
                        cantidad: element.quantityBought,
                        sellPrice: product.sellPrice,
                    }
                    tablaDetallada.push(aux);  
                    encontrado = true; 
            } else {
                if (encontrado) {
                    break;
                }
            }
        }
        if (encontrado) {
            this.setState({
                show: true,
                tablaDetallada: tablaDetallada,
            });
        }
    }

    componentDidMount() {
        this.getSellLogData();
        this.getDataProduct();
        this.getSellRecordData();
        this.getClientData();
    }

    //Metodo para buscar por nombre de cliente
    buscar(e) {
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

    //metodo para buscar por fecha  
    buscarFecha(e) {
        this.setState({
            fecha: e.target.value
        });
    }


    render() {
        const sellRecord = this.state.recordData;
        const rowsData = [];
        const cliente = this.state.dataCliente;
        if(cliente.length > 0){
            for (let i = 0; i < sellRecord.length; i++) {
                const element = sellRecord[i];
                const client = cliente.find(cliente => cliente.clientId === element.clientId);
                if (client.nombre_C.toLocaleLowerCase().toString().includes(this.state.nombre_C.toLocaleLowerCase().toString())) {
                    if (element.sellDate.includes(this.state.fecha)) {
                        const aux = {
                            key : i,
                            sellId: element.sellId,
                            clientName: client.nombre_C,
                            sellDate: element.sellDate,
                            total: element.total,
                        };
                        rowsData.push(aux);
                    } 
                } 
                // const aux = {
                //     key : i,
                //     sellId: element.sellId,
                //     clientName: client.nombre_C,
                //     sellDate: element.sellDate,
                //     total: element.total,
                // };
                // rowsData.push(aux);
            }
        }
        const rows = rowsData.map((element) =>
            <tr key={element.sellId}>
                <td className="child2" onClick={() => this.openModal(element.sellId)}>{element.clientName}</td>
                <td className="child2" onClick={() => this.openModal(element.sellId)}>{element.sellDate}</td>
                <td className="child1" onClick={() => this.openModal(element.sellId)}>${element.total}</td>
            </tr>
        );
        const detalles = this.state.tablaDetallada;
        const rowsDetalles = detalles.map((element) =>
            <tr key={element.prodId}>
                <td className="child2">{element.prodName}</td>
                <td className="child2">{element.cantidad}</td>
                <td className="child1">${element.sellPrice * element.cantidad}</td>
            </tr>
        );
        return (
            <div className="container">
                <h2>Registro de Ventas
                </h2>
                <form>
                    <div className="group">
                        <input type="text" value={this.state.nombre_C} onChange={e => this.buscar(e)} required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre Cliente</label>
                    </div>
                </form>
                <form>
                    <div >
                        <input type="date" value={this.state.fecha} onChange={e => this.buscarFecha(e)} required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Fecha</label>
                    </div>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="head">Cliente</th>
                            <th className="head1">Fecha</th>
                            <th className="head1">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <Modal title="Ventas Detalladas" onClose={() => this.setShow(false)} show={this.state.show}>
                <div >
                <table className="table">
                    <thead>
                        <tr>
                            <th className="head">Producto</th>
                            <th className="head2">Cantidad</th>
                            <th className="head1">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowsDetalles}
                    </tbody>
                </table>
                </div>
                </Modal>
            </div>
        );
    }
}
