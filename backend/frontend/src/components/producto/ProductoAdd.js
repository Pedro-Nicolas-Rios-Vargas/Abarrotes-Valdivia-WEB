import React, { Component } from 'react';
import makeCancelable from '../../utils/callBarcodeSocket'

export default class ProductoAdd extends Component {
    defaultName = ""
    defaultSecondName = ""
    defaultStock = ""
    defaultpresentacion = ""
    defualtsellPrice = ""
    defaultId = ""
    constructor(props) {
        super(props);
        this.fetchSocketData = null;
        this.state = {
            prodName: this.defaultName,
            existencia: this.defaultSecondName,
            stock: this.defaultStock,
            presentacion: this.defaultpresentacion,
            sellPrice: this.defualtsellPrice,
            prodId: this.defaultId,
            waitingBarCode: false,
        }

        this.AddClient = this.AddClient.bind(this);
        this.getNameProducto = this.getNameProducto.bind(this);
        this.getexistencia = this.getexistencia.bind(this);
        this.getstock = this.getstock.bind(this);
        this.getpresentacion = this.getpresentacion.bind(this);
        this.getsellPrice = this.getsellPrice.bind(this);
        this.getprodId = this.getprodId.bind(this);
        this.initSocketServer = this.initSocketServer.bind(this);
    }

    getprodId(e) {
        if (/^(\d{0,15})?$/.test(e.target.value)) {
            this.setState({
                prodId: e.target.value,
            });
        } else {
            this.setState({
                prodId: this.state.prodId,
            })
        }
    }

    getNameProducto(e) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ-\d\s]{0,64}$/.test(e.target.value)) {
            this.setState({
                prodName: e.target.value,
            });

        } else {
            this.setState({
                prodName: this.state.prodName,
            })
        }
    }

    getexistencia(e) {
        if (/^(\d{0,2})?$/.test(e.target.value)) {
            this.setState({
                existencia: e.target.value,
            });
        } else {
            this.setState({
                existencia: this.state.existencia,
            })
        }
    }

    getstock(e) {
        if (/^(\d{0,2})?$/.test(e.target.value)) {
            this.setState({
                stock: e.target.value,
            });
        } else {
            this.setState({
                stock: this.state.stock,
            })
        }
    }

    getpresentacion(e) {
        this.setState({
            presentacion: e.target.value,
        });
    }

    getsellPrice(e) {
        if (/^(\d{0,4})([.]\d{0,2})?$/.test(e.target.value)) {
            this.setState({
                sellPrice: e.target.value,
            });
        } else {
            this.setState({
                sellPrice: this.state.sellPrice,
            })
        }
    }

    AddClient() {
        if (this.state.prodName !== "" && this.state.existencia !== "" &&
            this.state.presentacion !== "" && this.state.sellPrice !== "" &&
            this.state.stock !== "" && this.state.prodId !== "") {
            const requiestProducto = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prodId: this.state.prodId,
                    prodName: this.state.prodName,
                    existencia: this.state.existencia,
                    stock: this.state.stock,
                    presentacion: this.state.presentacion,
                    sellPrice: this.state.sellPrice,
                }),
            };
            fetch("/producto/add-producto", requiestProducto)
                .then((response) => response.json())
                .then((data) => console.log(data));
            alert("Producto agregado con éxito");
            this.setState({
                prodName: "",
                existencia: "",
                stock: "",
                presentacion: "",
                sellPrice: "",
                prodId: "",
            })
        } else {
            alert("No se puede agregar un Producto sin nombre, existencia, stock, presentación o precio");
        }
    }

    initSocketServer() {
        if (!this.state.waitingBarCode) {
            console.log('Ejecutando fetch...');
            this.fetchSocketData = makeCancelable();
            this.setState({
                waitingBarCode: true
            });
            this.barcodeHandler();
        }
    }

    barcodeHandler() {
        let fetchedData = this.fetchSocketData.promise;
        fetchedData
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log('Fetch terminado.');
                if (data.Barcode !== 'No barcode') {
                    this.setState({
                        prodId: data.Barcode,
                        waitingBarCode: false,
                    });
                    console.log('barcode:', this.state.prodId);
                } else {
                    this.setState({
                        waitingBarCode: false,
                    })
                }
            })
            .catch((err) => {
                //console.error(err);
            });
    }

    componentDidMount() {
        this.initSocketServer();
    }

    componentDidUpdate() {
        this.initSocketServer();
    }

    componentWillUnmount() {
        this.fetchSocketData.cancel();
    }

    render() {
        return (
            <div className="container">
                <h2>Agregar Producto
                    <small>Datos del Producto</small>
                </h2>

                <form>
                    <div className="group">
                        <input type="text" required name="prodId" value={this.state.prodId} onChange={e => this.getprodId(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Identificador</label>
                    </div>

                    <div className="group">
                        <input type="text" required name="prodName" value={this.state.prodName} onChange={e => this.getNameProducto(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>

                    <div className="group">
                        <input type="text" required name="existencia" value={this.state.existencia} onChange={e => this.getexistencia(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Existencia</label>
                    </div>

                    <div className="group">
                        <input type="text" required name="stock" value={this.state.stock} onChange={e => this.getstock(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Stock</label>
                    </div>

                    <div className="group">
                        <input type="text" list="tipo-presentacion" autoComplete="off" required name="presentacion" value={this.state.presentacion} onChange={e => this.getpresentacion(e)} />
                        <datalist id="tipo-presentacion">
                            <option value="Unidad"></option>
                            <option value="Kilogramo"></option>
                        </datalist>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Presentación</label>
                    </div>

                    <div className="group">
                        <input type="text" required name="sellPrice" value={this.state.sellPrice} onChange={e => this.getsellPrice(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Precio</label>
                    </div>
                </form>
                <div className="footer">
                    <button className="btn" onClick={ () => this.AddClient() } >Agregar</button>
                </div>
            </div>
        );
    }
}
