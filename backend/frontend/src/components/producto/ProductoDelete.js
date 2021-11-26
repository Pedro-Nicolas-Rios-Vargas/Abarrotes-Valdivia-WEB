import React, { Component } from "react";
/**
 * Clase para eliminar productos
 */
export default class ProductoDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataTable: [],
            show: false,
            prodId: "",
            prodName: "",
            existencia: 0,
            sellPrice: 0.0,
            stock: 0,
            presentacion: 0,
            buscador: ""
        };
        this.getProductData = this.getProductData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.modiData = this.modiData.bind(this);
        this.applyChanges = this.applyChanges.bind(this);

        this.getprodId = this.getprodId.bind(this);
        this.getprodName = this.getprodName.bind(this);
        this.getexistencia = this.getexistencia.bind(this);
        this.getsellPrice = this.getsellPrice.bind(this);
        this.getstock = this.getstock.bind(this);
        this.getpresentacion = this.getpresentacion.bind(this);

        this.buscar = this.buscar.bind(this);
        this.getBuscador = this.getBuscador.bind(this);
    }
    /**
     * Buscador xd
     * @param {*} e 
     */
    getBuscador(e) {
        this.setState({
            buscador: e.target.value,
        });
        this.buscar(e);
    }
    /**
     * Metodo para obtener el id
     * @param {*} e 
     */
    getprodId(value) {
        this.setState({
            prodId: value
       });
    }
    /**
     * metodo para obtener el nombre del producto
     * @param {*} e 
     */
    getprodName(value) {
        this.setState({
            prodName: value
       });
    }
    /**
     * metodo para obtener la existencia del producto
     * @param {*} e 
     */
    getexistencia(value) {
        this.setState({
            existencia: value
       });
    }
    /**
     * metodo para obtener el stock del producto
     * @param {*} e 
     */
    getsellPrice(value) {
        this.setState({
            sellPrice: value
       });
    }
    /**
     * Metodo pra obtener la presentacion
     * @param {*} e 
     */
    getstock(value) {
        this.setState({
            stock: value
       });
    }
    /**
     * Metodo para obtener el precio del producto
     * @param {*} e 
     */
    getpresentacion(value) {
        this.setState({
            presentacion: value
       });
    }
    /**
     * Metodo para obtener los datos producto de la BD
     */
    getProductData() {
        fetch('/producto/get-producto')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    data: data,
                    dataTable: data,
                });
            });
    }
    /**
     * si
     */
    componentDidMount() {
        this.getProductData();
    }
    /**
     * Metodo para eliminar un producto de la base de datos
     * @param {*} prodId 
     * @param {*} prodName 
     */
    deleteData(prodId, prodName) {
        if (confirm("Desea eliminar el Producto:   " + "   " + prodName)){
            fetch('/producto/delete-producto/' + prodId, {
                method: 'DELETE',
                body: JSON.stringify(this.state),
            }).then(response => response)
                .then((data) => {
                    if (data) {
                        this.getProductData();
                    }
                });
            alert("Producto eliminado con exito");
            this.setState({buscador: ""});
        }
    }
    /**
     * Si
     * @param {} prodId 
     */
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
    /**
     * Metodo para aplicar todo xd
     * @param {*} prodId 
     */
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
    /**
     * Metodo para buscar lo introducido 
     * Ya me harte alv
     * @param {*} e 
     */
    buscar(e) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ-\d\s]{0,64}$/.test(e.target.value)) {
            this.setState({
                buscador: e.target.value,
            });
            const nombre = e.target.value.toLowerCase();
            const auxData = []
            for (let i = 0; i < this.state.data.length; i++) {
                const element = this.state.data[i];
                const str = element.prodName.toLowerCase();
                const code = element.prodId.toLowerCase();
                if (str.includes(nombre) || code.includes(nombre)) {
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

    render() {
        const clienData = this.state.dataTable;
        const rows = clienData.map((product) =>
            <tr key={product.prodId}>
                <td className="child2" onClick={() => this.deleteData(product.prodId, product.prodName)}>{product.prodName}</td>
                <td className="child2" onClick={() => this.deleteData(product.prodId, product.prodName)}>{product.existencia}</td>
                <td className="child1" onClick={() => this.deleteData(product.prodId, product.prodName)}>${product.sellPrice}</td>
                <td className="child2" onClick={() => this.deleteData(product.prodId, product.prodName)}>{product.stock}</td>
                <td className="child2" onClick={() => this.deleteData(product.prodId, product.prodName)}>{product.presentacion}</td>
            </tr>
        );

        return (
            <div className={"container"}>
                <h2>Eliminar Producto
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
                            <th className="head">Existencia</th>
                            <th className="head">Precio de venta</th>
                            <th className="head">Stock</th>
                            <th className="head">Presentacion</th>
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
