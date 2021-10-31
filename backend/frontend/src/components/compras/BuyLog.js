import React, { Component, useState } from "react";
import Modal from './ModalBuy'

export default class Buylog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordData: [],
            logData: [],
            dataProduct: [],
            dataProv: [],
            tablaDetallada: [],
            existencia: 0,
            sellPrice: 0.0,
            stock: 0,
            presentacion: "",
            show: false,
            fecha: "",
            dataBuscar: [],
            provName: "",
        };
        this.getSellLogData = this.getSellLogData.bind(this);
        this.getSellRecordData = this.getSellRecordData.bind(this);
        this.getDataProduct = this.getDataProduct.bind(this);
        this.getClientData = this.getClientData.bind(this);
        this.componentDidMount =  this.componentDidMount.bind(this);
        this.setShow = this.setShow.bind(this);
        this.openModal = this.openModal.bind(this);
        this.buscar = this.buscar.bind(this);
        this.buscarFecha = this.buscarFecha.bind(this);
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
        await fetch('/buyLog/get-buyLog')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    logData: data
                });
            });
    }
    async getClientData() {
        await fetch('/proveedor/get-proveedor')
        .then(response => response.json())
        .then((data) => {
            this.setState({
                dataProv: data
            });
        });
    }

    async getSellRecordData() {
        await fetch('/buyRecord/get-buyRecord')
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

    async openModal(buyId){
        const logData = this.state.logData;
        let encontrado = false;
        const dataproduct = this.state.dataProduct;
        const tablaDetallada = [];
        let aux = [];
        for (let i = 0; i < logData.length; i++) {
            const element = logData[i];
            if (element.buyId === buyId) {
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

    async componentDidMount() {
        this.getSellLogData();
        this.getDataProduct();
        this.getSellRecordData();
        this.getClientData();
    }
    
    //Metodo para buscar por nombre de proveedor
    buscar(e) {
        this.setState({
            provName: e.target.value
        });
    }

    //metodo para buscar por fecha  
    buscarFecha(e) {
        this.setState({
            fecha: e.target.value
        });
    }


    render() {
        const sellRecord = this.state.recordData;
        const dataBuscar = [];
        const cliente = this.state.dataProv;
        if (cliente.length > 0) {
            for (let i = 0; i < sellRecord.length; i++) {
                const element = sellRecord[i];
                const client = cliente.find(cliente => cliente.provrId === element.provrId);
                if (client.provName.toLocaleLowerCase().toString().includes(this.state.provName.toLocaleLowerCase().toString())) {
                    if (element.buyDate.includes(this.state.fecha)) {
                        const aux = {
                            key : i,
                            buyId: element.buyId,
                            provName: client.provName,
                            buyDate: element.buyDate,
                            total: element.total,
                        };
                        dataBuscar.push(aux);
                    } 
                } 
            }
        }
        const rows = dataBuscar.map((element) =>
            <tr key={element.key}>
                <td className="child2" onClick={() => this.openModal(element.buyId)}>{element.provName}</td>
                <td className="child2" onClick={() => this.openModal(element.buyId)}>{element.buyDate}</td>
                <td className="child1" onClick={() => this.openModal(element.buyId)}>${element.total}</td>
            </tr>
        );
        const detalles = this.state.tablaDetallada;
        const rowsDetalles = detalles.map((element) =>
            <tr key={element.prodId}>
                <td className="child2">{element.prodName}</td>
                <td className="child2">{element.cantidad}</td>
                <td className="child1" >${element.sellPrice * element.cantidad}</td>
            </tr>
        );
        return (
            <div className="container">
                <h2>Registro de Compras
                </h2>
                <form>
                    <div className="group">
                        <input type="text" value={this.state.provName} onChange={e => this.buscar(e)} required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre Proveedor</label>
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
                            <th className="head">Proveedor</th>
                            <th className="head1">Fecha</th>
                            <th className="head1">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <Modal title="Compras Detalladas" onClose={() => this.setShow(false)} show={this.state.show}>
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