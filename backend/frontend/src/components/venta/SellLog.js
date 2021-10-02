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
        };
        this.getSellLogData = this.getSellLogData.bind(this);
        this.getSellRecordData = this.getSellRecordData.bind(this);
        this.getDataProduct = this.getDataProduct.bind(this);
        this.getClientData = this.getClientData.bind(this);
        this.componentDidMount =  this.componentDidMount.bind(this);
        this.setShow = this.setShow.bind(this);
        this.openModal = this.openModal.bind(this);
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
                    //break;
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


    render() {
        const sellRecord = this.state.recordData;
        const rowsData = [];
        const cliente = this.state.dataCliente;
        if(cliente.length > 0){
            for (let i = 0; i < sellRecord.length; i++) {
                const element = sellRecord[i];
                const client = cliente.find(cliente => cliente.clientId === element.clientId);
                const aux = {
                    sellId: element.sellId,
                    clientName: client.nombre_C,
                    sellDate: element.sellDate,
                    total: element.total,
                };
                rowsData.push(aux);
            }
        }
        const rows = rowsData.map((element) =>
            <tr key={element.sellId}>
                <td>{element.clientName}</td>
                <td>{element.sellDate}</td>
                <td>{element.total}</td>
                <td>
                    <button id="btnSellLog" className="btn btn-Detalles" onClick={() => this.openModal(element.sellId)}>Detallas</button>
                </td>
            </tr>
        );
        const detalles = this.state.tablaDetallada;
        const rowsDetalles = detalles.map((element) =>
            <tr key={element.prodId}>
                <td>{element.prodName}</td>
                <td>{element.cantidad}</td>
                <td>{element.sellPrice * element.cantidad}</td>
            </tr>
        );
        return (
            <div>
                <table className="tableSelRecord"  style={{ paddingLeft: 150 }}>
                    <thead>
                        <tr>
                            <th className="head-table">Cliente</th>
                            <th className="head-table">Fecha</th>
                            <th className="head-table">Total</th>
                            <th className="head-table">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <Modal title="Venta Detallada" onClose={() => this.setShow(false)} show={this.state.show}>
                <table className="tableSellLog">
                    <thead>
                        <tr>
                            <th className="head-table">Producto</th>
                            <th className="head-table">Cantidad</th>
                            <th className="head-table">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowsDetalles}
                    </tbody>
                </table>
                </Modal>
            </div>
        );
    }
}