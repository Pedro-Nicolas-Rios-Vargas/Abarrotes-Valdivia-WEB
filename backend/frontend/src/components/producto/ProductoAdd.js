import React, { Component } from 'react';
import makeCancelable from '../../utils/callBarcodeSocket'
import LabelError from '../LabelError';
/**
 * Clase anadir producto
 */
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
            errorName: "hidden",
            errorExistencia: "hidden",
            errorStock: "hidden",
            errorPresentacion: "hidden",
            errorSellPrice: "hidden",
            errorProdId: "hidden",
            msmPresentacion: "",
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
    /**
     * Metodo para obtener el id
     * @param {*} e 
     */
    getprodId(e) {
        if (/^(\d{0,15})?$/.test(e.target.value)) {
            this.setState({
                prodId: e.target.value,
                errorProdId: "hidden",
            });
        } else {
            this.setState({
                prodId: this.state.prodId,
                errorProdId: "hidden",
            })
        }
    }
    /**
     * metodo para obtener el nombre del producto
     * @param {*} e 
     */
    getNameProducto(e) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ-\d\s]{0,64}$/.test(e.target.value)) {
            this.setState({
                prodName: e.target.value,
                errorName: "hidden",
            });

        } else {
            this.setState({
                prodName: this.state.prodName,
                errorName: "hidden",
            })
        }
    }
    /**
     * metodo para obtener la existencia del producto
     * @param {*} e 
     */
    getexistencia(e) {
        if (/^(\d{0,2})?$/.test(e.target.value)) {
            this.setState({
                existencia: e.target.value,
                errorExistencia: "hidden",
            });
        } else {
            this.setState({
                existencia: this.state.existencia,
                errorExistencia: "hidden",
            })
        }
    }
    /**
     * metodo para obtener el stock del producto
     * @param {*} e 
     */
    getstock(e) {
        if (/^(\d{0,2})?$/.test(e.target.value)) {
            this.setState({
                stock: e.target.value,
                errorStock: "hidden",
            });
        } else {
            this.setState({
                stock: this.state.stock,
                errorStock: "hidden",
            })
        }
    }
    /**
     * Metodo pra obtener la presentacion
     * @param {*} e 
     */
    getpresentacion(e) {
        this.setState({
            presentacion: e.target.value,
            errorPresentacion: "hidden",
        });
    }
    /**
     * Metodo para obtener el precio del producto
     * @param {*} e 
     */
    getsellPrice(e) {
        if (/^(\d{0,4})([.]\d{0,2})?$/.test(e.target.value)) {
            this.setState({
                sellPrice: e.target.value,
                errorSellPrice: "hidden",
            });
        } else {
            this.setState({
                sellPrice: this.state.sellPrice,
                errorSellPrice: "hidden",
            })
        }
    }
    /**
     * Metodo para anadir un cliente a la base de datos
     */
    AddClient() {
        if (this.state.prodName !== "" && this.state.existencia !== "" &&
            this.state.presentacion !== "" && this.state.sellPrice !== "" &&
            this.state.stock !== "" && this.state.prodId !== "") {
                if (this.state.presentacion === "Unidad" || this.state.presentacion === "Kilogramo") {
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
                    this.setState({
                        errorPresentacion: "",
                        msmPresentacion: "La presentación debe ser unidad o kilogramo",
                    });
                }
        } else {
            if (this.state.prodName === "") {
                this.setState({
                    errorName: "",
                });
            }
            if (this.state.existencia === "") {
                this.setState({
                    errorExistencia: "",
                });
            }
            if (this.state.stock === "") {
                this.setState({
                    errorStock: "",
                });
            }
            if (this.state.presentacion === "") {
                this.setState({
                    errorPresentacion: "",
                    msmPresentacion: "Por favor, ingrese una presentación",
                });
            }
            if (this.state.sellPrice === "") {
                this.setState({
                    errorSellPrice: "",
                });
            }
            if (this.state.prodId === "") {
                this.setState({
                    errorProdId: "",
                });
            }

        }
    }
    /**
     * Si
     */
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
    /**
     * Si
     */
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
    /**
     * Si
     */
    componentDidMount() {
        this.initSocketServer();
    }
    /**
     * Si
     */
    componentDidUpdate() {
        this.initSocketServer();
    }
    /**
     * Si
     */
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
                        <LabelError visibility={this.state.errorProdId} msm={"Por favor, ingrese un codigo de barrar o un id"}/>
                        <input type="text" required name="prodId" value={this.state.prodId} onChange={e => this.getprodId(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Identificador</label>
                    </div>

                    <div className="group">
                        <LabelError visibility={this.state.errorName} msm={"Por favor, ingrese un nombre"}/>
                        <input type="text" required name="prodName" value={this.state.prodName} onChange={e => this.getNameProducto(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>

                    <div className="group">
                        <LabelError visibility={this.state.errorExistencia} msm={"Por favor, ingrese una existencia"}/>
                        <input type="text" required name="existencia" value={this.state.existencia} onChange={e => this.getexistencia(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Existencia</label>
                    </div>

                    <div className="group">
                        <LabelError visibility={this.state.errorStock} msm={"Por favor, ingrese un stock"}/>
                        <input type="text" required name="stock" value={this.state.stock} onChange={e => this.getstock(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Stock</label>
                    </div>

                    <div className="group">
                        <LabelError visibility={this.state.errorPresentacion} msm={this.state.msmPresentacion}/>
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
                        <LabelError visibility={this.state.errorSellPrice} msm={"Por favor, ingrese un precio de venta"}/>
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
