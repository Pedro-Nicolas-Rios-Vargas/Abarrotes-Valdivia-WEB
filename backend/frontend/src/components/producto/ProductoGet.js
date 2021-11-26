import React, { Component } from "react";
/**
 * Clase para buscar productos
 */
export default class ProductoGet extends Component {
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
        };
        this.getProductData = this.getProductData.bind(this);

        this.getprodId = this.getprodId.bind(this);
        this.getprodName = this.getprodName.bind(this);
        this.getExistencia = this.getExistencia.bind(this);
        this.getsellPrice = this.getsellPrice.bind(this);
        this.getstock = this.getstock.bind(this);
        this.getpresentacion = this.getpresentacion.bind(this);

        this.buscar = this.buscar.bind(this);
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
    getExistencia(value) {
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
     * Metodo para eliminar el producto de la base de datos
     * @param {*} prodId 
     */
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
    /**
     * Metodo para buscar productos
     * @param {*} e 
     */
    buscar(e) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ-\d\s]{0,64}$/.test(e.target.value)) {
            this.setState({
                prodName: e.target.value
            });
            const nombre = e.target.value.toLowerCase();
            const auxData = []
            for (let i = 0; i < this.state.data.length; i++) {
                const element = this.state.data[i];
                const str = element.prodName.toLowerCase();
                const code = element.prodId.toLowerCase();
                // Busqueda dinamica con nombre y codigo
                if (str.includes(nombre) || code.includes(nombre)) {
                    console.log(code)
                    auxData.push(element);    
                }
            }
            this.setState({
                dataTable: auxData,
            });
        } else {
            this.setState({ prodName: this.state.prodName });
        }
    }


    render() {
        const clienData = this.state.dataTable;
        const rows = clienData.map((clien) =>
            <tr key={clien.prodId}>
                <td className="child2" >{clien.prodName}</td>
                <td className="child2">{clien.existencia}</td>
                <td className="child1">${clien.sellPrice}</td>
                <td className="child2" >{clien.stock}</td>
                <td className="child2">{clien.presentacion}</td>
            </tr>
        );

        return (
            <div className={"container"}>
                <h2>Buscar Producto
                </h2>
                <form>
                    <div className="group">
                        <input type="text" required value={this.state.prodName}  onChange={e => this.buscar(e)} />
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
                            <th className="head">Presentación</th>
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
