import React, { Component } from "react";

export default class ProductoDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            prodId: "",
            prodName: "",
            existencia: 0,
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
        this.getexistencia = this.getexistencia.bind(this)
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

    getexistencia(value) {
        this.setState({
            existencia: value
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
                existencia: data.existencia,
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
                existencia: this.state.existencia,
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
                <td>{product.existencia}</td>
                <td>{product.sellPrice}</td>
                <td>{product.stock}</td>
                <td>{product.presentacion}</td>
                <td>
                    <button onClick={() => this.deleteData(product.prodId)} className="btn btn_confirm" >Eliminar</button>
                    {/* <button onClick={() => this.modiData(clien.prodId)} className="btn btn-modifi">Modificar</button> */}
                </td>
            </tr>
        );

        return (
            <div className={"container"}>
                <h2>Eliminar Producto
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
                            <th className="head">Nomrbe</th>
                            <th className="head">Existencia</th>
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
            </div>
        );
    }
}