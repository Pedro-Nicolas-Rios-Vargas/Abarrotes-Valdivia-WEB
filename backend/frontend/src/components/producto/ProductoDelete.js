import React, { Component } from "react";

export default class ProductoDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            prodId: "",
            prodName: "",
            buyPrice: 0.0,
            sellPrice: 0.0,
            stock: 0,
            presentacion: 0,
        };
        this.getProductData = this.getProductData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.modiData = this.modiData.bind(this);
        this.applyChanges = this.applyChanges.bind(this);

        this.getprodId = this.getprodId.bind(this)
        this.getprodName = this.getprodName.bind(this)
        this.getbuyPrice = this.getbuyPrice.bind(this)
        this.getsellPrice = this.getsellPrice.bind(this)
        this.getstock = this.getstock.bind(this)
        this.getpresentacion = this.getpresentacion.bind(this)
    }

    getprodId(value) {
        this.setState({
            prodId: value
       });
    }

    getprodName(value) {
        this.setState({
            prodName: value
       });
    }

    getbuyPrice(value) {
        this.setState({
            buyPrice: value
       });
    }

    getsellPrice(value) {
        this.setState({
            sellPrice: value
       });
    }

    getstock(value) {
        this.setState({
            stock: value
       });
    }

    getpresentacion(value) {
        this.setState({
            presentacion: value
       });
    }

    getProductData() {
        fetch('/producto/get-producto')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    data: data
                });
            });
    }

    componentDidMount() {
        this.getProductData();
    }

    deleteData(prodId) {
        fetch('/producto/delete-producto/' + prodId, {
            method: 'DELETE',
            body: JSON.stringify(this.state),
        }).then(response => response)
            .then((data) => {
                if (data) {
                    this.getProductData();
                }
            });
    }

    modiData(prodId) {
        fetch('/producto/update-producto/' + prodId)
        .then(response => response.json())
        .then((data) => {
            //console.log(data)
            this.setState({
                prodId: data.prodId,
                prodName: data.prodName,
                buyPrice: data.buyPrice,
                sellPrice: data.sellPrice,
                stock: data.stock,
                presentacion: data.presentacion
            });
        });
        { this.setState({ show: true }) }
    }

    applyChanges(prodId) {
        const requiestClient = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prodId: this.state.prodId,
                prodName: this.state.prodName,
                buyPrice: this.state.buyPrice,
                sellPrice: this.state.sellPrice,
                stock: this.state.stock,
                presentacion: this.state.presentacion
            }),
        };
        console.log(prodId);
        fetch("/producto/update-producto/"+ prodId, requiestClient)
        .then((response) => response.json())
        .then((data) => console.log(data));
        { this.setState({ show: false }) }
    }

    render() {
        const clienData = this.state.data;
        const rows = clienData.map((product) =>
            <tr key={product.prodId}>
                <td>{product.prodName}</td>
                <td>{product.buyPrice}</td>
                <td>{product.sellPrice}</td>
                <td>{product.stock}</td>
                <td>{product.presentacion}</td>
                <td>
                    <button onClick={() => this.deleteData(product.prodId)} className="btn btn-delete" >Eliminar</button>
                    {/* <button onClick={() => this.modiData(clien.prodId)} className="btn btn-modifi">Modificar</button> */}
                </td>
            </tr>
        );

        return (
            <div>
                <table className="tablaClientes">
                    <thead>
                        <tr>
                            <th className="head">Nomrbe</th>
                            <th className="head">Precio de compra</th>
                            <th className="head">Precio de venta</th>
                            <th className="head">Stock</th>
                            <th className="head">Presentacion</th>
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
                                            <input id='prodId' value={this.state.prodId} onChange={e => this.getprodId(e.target.value)} type="text" placeholder="ID" disabled></input>
                                            <input id='prodName' value={this.state.prodName} onChange={e => this.getprodName(e.target.value)} type="text" placeholder="Jesus Alonso"></input>
                                            <input id='buyPrice' value={this.state.buyPrice} onChange={e => this.getbuyPrice(e.target.value)} type="text" placeholder="Perez Guerra"></input>
                                            <input id='sellPrice' value={this.state.sellPrice} onChange={e => this.getsellPrice(e.target.value)} type="text" placeholder="example@example.com"></input>
                                            <input id='stock' value={this.state.stock} onChange={e => this.getstock(e.target.value)} type="text" placeholder="5555555555"></input>
                                            <input id='presentacion' value={this.state.presentacion} onChange={e => this.getpresentacion(e.target.value)} type="text" placeholder="43.13"></input>
                                        </div>
                                        <div>
                                            <button onClick={() => this.applyChanges(this.state.prodId)} className="btn btn-applyChanges">Guardar Cambios</button>
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