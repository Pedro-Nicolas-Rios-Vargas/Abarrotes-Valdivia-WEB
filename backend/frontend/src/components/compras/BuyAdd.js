import React, { Component } from 'react';
import AutoComplete from './AutoComplete';
import makeCancelable from '../../utils/callBarcodeSocket';
/**
 * Clase Realizas compras
 */
export default class SellAdd extends Component {

    constructor(props) {
        super(props);

        this.fetchSocketData = null;
        this.state = {
            reset: "",
            data: [],
            show: false,
            prodId: "",
            prodName: "",
            existencia: 0.0,
            sellPrice: 0.0,
            stock: 0,
            presentacion: 0,
            dataMostrar: [],
            cantidad: [],
            dataProv: [],
            prov: [],
            provrId: 0,
            provName: "",
            inputProv: false,
            together: [],
            total: 0,
            showFeriaYmas: false,
            aPagar: 0.0,
            cambio: 0.0,
            btnMas: false,
            btnMenos: false,
            sellId: 0,
            sellDate: "",
            mandarProv: [],
            mandarProductos: [],
            waitingBarCode: false,
            errorProv: "hidden",
            errorProducto: "hidden",
        };

        this.getProductData = this.getProductData.bind(this);
        this.buscarProducto = this.buscarProducto.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getProvData = this.getProvData.bind(this);

        this.getprodId = this.getprodId.bind(this);
        this.getprodName = this.getprodName.bind(this);
        this.getexistencia = this.getexistencia.bind(this);
        this.getsellPrice = this.getsellPrice.bind(this);
        this.getstock = this.getstock.bind(this);
        this.getpresentacion = this.getpresentacion.bind(this);

        this.getclientId = this.getclientId.bind(this);
        this.getProvName = this.getProvName.bind(this);
        this.agregar = this.agregar.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.actualizar = this.actualizar.bind(this);
        this.finalizar = this.finalizar.bind(this);
        this.baseState = this.baseState.bind(this);
        this.clearInput1 = this.clearInput1.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.barcodeHandler = this.barcodeHandler.bind(this);
    }

    /**
     * Obtiene el nombre escrito
     * @param {string} value 
     */
    getProvName(value) {
        this.setState({
            provName: value
        });
    }
    /**
     * Obtiene los datos del proveedor de la base de datos
     */
    getProvData() {
        fetch('/proveedor/get-proveedor')
            .then(response => response.json())
            .then((data) => {
                const juntar = [];
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    const aux = {
                        id: element.provrId,
                        nombre: element.provName
                    }
                    juntar.push(aux)
                }
                this.setState({
                    dataProv: data,
                    mandarProv: juntar,
                });
            });

    }
    /**
     * Obtiene el in del proveedor
     * @param {int} value 
     */
    getclientId(value) {
        this.setState({
            clientId: value
        });
    }
    /**
     * Obtiene el id del producto
     * @param {int} value 
     */
    getprodId(value) {
        this.setState({
            prodId: value
        });
    }
    /**
     * Obtiene el nombre del proveedor
     * @param {string} value 
     */
    getprodName(value) {
        this.setState({
            prodName: value
        });
    }
    /**
     * Obtiene la existencia
     * @param {int} value 
     */
    getexistencia(value) {
        this.setState({
            existencia: value
        });
    }
    /**
     * Obtiene precio de venta
     * @param {float} value 
     */
    getsellPrice(value) {
        this.setState({
            sellPrice: value
        });
    }
    /**
     * Obtiene el stock del proveedor
     * @param {int} value 
     */
    getstock(value) {
        this.setState({
            stock: value
        });
    }
    /**
     * Obtiene la presentacion
     * @param {string} value 
     */
    getpresentacion(value) {
        this.setState({
            presentacion: value
        });
    }
    /**
     * Metodo que obtiene los proveedores 
     */
    async getProductData() {
        await fetch('/producto/get-producto')
            .then(response => response.json())
            .then((data) => {
                const juntar = [];
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    const aux = {
                        id: element.prodId,
                        nombre: element.prodName
                    }
                    juntar.push(aux)
                }
                this.setState({
                    data: data,
                    mandarProductos: juntar,
                });
            });
    }
    /**
     * ???
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
     * ???
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
                    this.agregar();
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
     * Montador xd
     */
    componentDidMount() {
        this.getProductData();
        this.initSocketServer();
        this.getProvData();
    }
    /**
     * So
     */
    componentDidUpdate() {
        this.initSocketServer();
    }
    /**
     * 177013
     */
    componentWillUnmount() {
        this.fetchSocketData.cancel();
    }

    /**
     * Buscador de producto
     * @param {int} prodIdBuscar 
     */
    buscarProducto(prodIdBuscar) {
        // Validar de alguna forma que no vuelva a poner el mismo producto, o si lo vuelve a poner que aumente el contador
        // de dicho producto.
        // Ve como hacer para que la cantidad aumente
        if (parseInt(prodIdBuscar)) {
            const nuevoProducto = this.state.data.find(data => data.prodId === prodIdBuscar);
            if (nuevoProducto !== undefined) {
                const listaProductos = this.state.together;
                let yaEsta = listaProductos.find(listaProductos => listaProductos.prodId === prodIdBuscar);
                if (yaEsta !== undefined) {
                    function getIndex(listaProductos) {
                        return listaProductos.prodId === prodIdBuscar;
                    }

                    const posicion = listaProductos.findIndex(getIndex);
                    const aux = listaProductos[posicion];

                    listaProductos[posicion] = {
                        prodId: aux.prodId,
                        prodName: aux.prodName,
                        existencia: aux.existencia,
                        sellPrice: aux.sellPrice,
                        stock: aux.stock,
                        presentacion: aux.presentacion,
                        cantidad: aux.cantidad + 1,
                        prov: this.state.prov,
                    }

                    this.setState({
                        together: listaProductos,
                    })
                    this.actualizar();
                } else {
                    const fucion = {
                        prodId: nuevoProducto.prodId,
                        prodName: nuevoProducto.prodName,
                        existencia: nuevoProducto.existencia,
                        sellPrice: (nuevoProducto.sellPrice),
                        stock: nuevoProducto.stock,
                        presentacion: nuevoProducto.presentacion,
                        cantidad: 1,
                        prov: this.state.prov,
                    }
                    listaProductos.push(fucion);
                    this.setState({
                        together: listaProductos,
                    });
                    this.actualizar()
                }

            } else {
            }
        } else {
            console.log('Producto no encontrado')
        }
    }
    /**
     * Actualizar la tabla cada movimiento
     */
    actualizar() {
        const paraLaFeria = this.state.together
        let total2 = 0
        for (let i = 0; i < paraLaFeria.length; i++) {
            const element = paraLaFeria[i];
            total2 = parseFloat(total2) + parseFloat(element.sellPrice) * parseFloat(element.cantidad);
        }
        if (this.state.aPagar === NaN) {
            alert("No hay dinero con el cual cobrar")
        } else {
            this.setState({
                total: total2.toFixed(2),
                cambio: (this.state.aPagar - total2).toFixed(2),
            });
        }
    }
    /**
     * Estado base del state
     */
    baseState() {
        this.setState(({
            together: [],
            total: 0.00,
            cambio: 0.00,
            prov: {},
            showFeriaYmas: false,
            aPagar: 0.00,
            provName: "",
            prodName: "",
            reset: "",
        }));
        this.clearInput1();
        this.clearInput();
    }
    /**
     * Buscador de proveedor por nombre xd
     * @param {String} provName 
     */
    buscarCliente(provName) {
        const nuevoCliente = this.state.dataProv.find(cliente => cliente.provName === provName);
        if (nuevoCliente !== undefined) {
            this.setState({
                prov: nuevoCliente,
            });
        } else {
            console.log("Cliente no encontrado");
        }
    }

    /**
     * Eliminar una dato de la tabla
     * @param {int} index 
     */
    removeRow(index) {
        const rows = this.state.together;
        const rows2 = this.state.dataMostrar
        function getIndex(rows) {
            return rows.prodId === index;
        }
        const porBorrar = rows.findIndex(getIndex);
        rows.splice(porBorrar, 1);
        rows2.splice(porBorrar, 1);
        this.setState({
            together: rows,
            dataMostrar: rows2,
        });
        this.actualizar();
    }
    /**
     * Metodo para agregar algo a la tabla
     */
    agregar() {
        if (this.state.provName === "" || this.state.prodId === "") {
            if (this.state.provName === "") {
                this.setState({
                    errorProv: "",
                });
            }
            if (this.state.prodId === "") {
                this.setState({
                    errorProducto: "",
                });
            }
        } else {
            this.actualizar();
            this.buscarProducto(this.state.prodId);
            this.buscarCliente(this.state.provName);
            this.setState({
                showFeriaYmas: true,
                inputCliente: true,
                errorProv: "hidden",
                errorProducto: "hidden",
                prodId: "",
            });
            this.clearInput();
        }
    }


    /**
     * Disminuir la cantidad de un producto a vender
     * @param {int} prodId 
     */
    downCanitdad(prodId) {
        // Validar que no ponga numero negativos
        const listaProductos = this.state.together;
        function getIndex(listaProductos) {
            return listaProductos.prodId === prodId;
        }
        const posicion = listaProductos.findIndex(getIndex);
        const aux = listaProductos[posicion];
        if (listaProductos[posicion].cantidad !== 0) {
            listaProductos[posicion] = {
                prodId: aux.prodId,
                prodName: aux.prodName,
                existencia: aux.existencia,
                sellPrice: aux.sellPrice,
                stock: aux.stock,
                presentacion: aux.presentacion,
                cantidad: aux.cantidad - 1,
            }
            this.setState({
                together: listaProductos,
            })

        }


        this.actualizar();
    }
    /**
     * Aumenta la cantidad de un producto a vender
     * @param {int} prodId 
     */
    upCanitdad(prodId) {
        const listaProductos = this.state.together;
        function getIndex(listaProductos) {
            return listaProductos.prodId === prodId;
        }
        const posicion = listaProductos.findIndex(getIndex);
        const aux = listaProductos[posicion];

        listaProductos[posicion] = {
            prodId: aux.prodId,
            prodName: aux.prodName,
            existencia: aux.existencia,
            sellPrice: aux.sellPrice,
            stock: aux.stock,
            presentacion: aux.presentacion,
            cantidad: aux.cantidad + 1,
            ptov: this.state.prov,
        }

        this.setState({
            together: listaProductos,
        })
        this.actualizar();
    }


    /**
     * Metodo para finalizar la compra
     */
    finalizar() {

        function pushSellLog(together) {
            return new Promise((resolve, reject) => {
                fetch('/buyLog/get-last')
                    .then(response => response.json())
                    .then((data) => {
                        for (let i = 0; i < together.length; i++) {
                            const element = together[i];
                            const buyLog = {
                                method: 'POST',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    buyId: data.buyId,
                                    prodId: element.prodId,
                                    quantityBought: element.cantidad,
                                }),
                            };
                            fetch("/buyLog/add-buyLog", buyLog)
                                .then((response) => response.json())
                                .then((data) => console.log(data));
                            const producto = {
                                method: 'PUT',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    prodId: element.prodId,
                                    prodName: element.prodName,
                                    existencia: element.existencia + element.cantidad,
                                    sellPrice: element.sellPrice,
                                    stock: element.stock,
                                    presentacion: element.presentacion
                                })
                            }
                            fetch("/producto/update-producto/" + element.prodId, producto)
                                .then((response) => response.json())
                                .then((data) => { console.log(data) });
                        }
                    });
            });
        }

        async function mandarDB(buyRecord) {
            await fetch("/buyRecord/add-buyRecord", buyRecord)
                .then((response) => response.json())
                .then((data) => console.log(data));
        }

        async function asyncAll(proveedor, total, together) {
            const buyRecord = await pushSellRecord(proveedor, total);
            await mandarDB(buyRecord);
            await pushSellLog(together);
        }

        function pushSellRecord(proveedor, total) {
            return new Promise((resolve, reject) => {
                let date = new Date();
                const fecha = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                const buyRecord = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        provrId: proveedor.provrId,
                        buyDate: fecha,
                        total: total,
                    }),
                };
                resolve(buyRecord)
            });

        }


        const together = this.state.together;
        let continuar = true;
        const data = this.state.data;
        for (let i = 0; i < together.length; i++) {
            const element = together[i];
            const productoDB = data.find(data => data.prodId === element.prodId);
            if (productoDB.existencia > element.stock) {
                continuar = false;
                alert("Esta comprando por encima del stock establecido del producto: \n" + (element.prodName).toString());
                break;
            }
        }


        if (continuar) {
            if (this.state.cambio === 0.00) {
                asyncAll(this.state.prov, this.state.total, together);
                this.baseState();
                //En este caso es no se agrega nada a movement y no hay cambio, es una compra normal
            } else if (this.state.cambio < 0.00) {
                alert("No hay dinero suficiente para pagar al proveedor")
            } else if (this.state.cambio > 0.00) {
                alert("El cambio es: " + (this.state.cambio).toString())
                asyncAll(this.state.prov, this.state.total, together);
                this.baseState();
            }
        }

    }
    /**
     * Metodo que regresara los valores de sugerencias para el nombre del producto
     * @param {String} r 
     */
    retornoCliente(r) {
        this.setState({
            provName: r,
        });
        this.buscarCliente(r);
    }
    /**
     * Metodo que regresara los valores de sugerencias para el id del producto
     * @param {String} r 
     */
    retornoProducto(r) {
        this.setState({
            prodId: r.id,
            prodName: r.text,
        });
    }
    /**
     * Si
     */
    clearInput1() {
        this.input1.clear();
    }
    /**
     * Si2
     */
    clearInput() {
        this.input.clear();
    }

    render() {
        const together = this.state.together;
        const tabla = [];
        const prov = this.state.prov;


        for (let i = 0; i < together.length; i++) {
            const element = together[i];
            const togetherAux = {
                prodId: element.prodId,
                prodName: element.prodName,
                sellPrice: element.sellPrice,
                cantidad: element.cantidad,
                proveedor: prov.provName,
            }
            tabla.push(togetherAux);
        }

        const rows = tabla.map((product) =>
            <tr key={product.prodId}>
                <td className="child2">{product.prodName}</td>
                <td className="child2">
                    {product.cantidad}
                    <button id="upCantidad" className="btn btn_controller" onClick={() => this.upCanitdad(product.prodId)}>+</button>
                    <button id="downCantidad" className="btn btn_controller" onClick={() => this.downCanitdad(product.prodId)}>-</button>
                </td>
                <td className="child1">${product.sellPrice}</td>
                <td className="child2">
                    <button onClick={() => this.removeRow(product.prodId)} className="btn btn_confirm">Eliminar</button>
                </td>
            </tr>
        );

        const apagarCambiante = event => {

            if (/^(\d{0,4})([.]\d{0,2})?$/.test(event.target.value)) {
                const cambio = parseFloat(event.target.value - this.state.total).toFixed(2);
                this.setState({ cambio: cambio, aPagar: event.target.value });
            } else {
                this.setState({ aPagar: this.state.aPagar })
            }
        }

        return (
            <div className="container">
                <h2>Compras</h2>
                <form>
                    <AutoComplete ref={input1 => this.input1 = input1} 
                    item={this.state.mandarProv} 
                    inputName={"Nombre del Proveedor"} 
                    data={{ input: 0, retornoCliente: this.retornoCliente.bind(this) }} 
                    visibility={this.state.errorProv}
                    msm={"Por favor, ingrese el nombre del proveedor"}
                    />

                    <AutoComplete ref={input => this.input = input} 
                    item={this.state.mandarProductos} 
                    inputName={"ID o Nombre del producto"} 
                    data={{ input: 1, retornoProducto: this.retornoProducto.bind(this) }} 
                    visibility={this.state.errorProducto}
                    msm={"Por favor, ingrese el ID o el nombre del producto"}
                    />
                </form>
                <div className="footer">
                    <button className="btn" onClick={() => this.agregar()}>Agregar</button>

                </div>

                <div className="tableVentasCompras" >
                    <table className="tablaproducttes">
                        <thead>
                            <tr>
                                <th className="head">Nombre</th>
                                {/* <th className="head">Precio de compra</th> */}
                                <th className="head2">Cantidad</th>
                                <th className="head1">Subtotal</th>
                                <th className="head3">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
                <div className="CambioYfinalizacion">
                    {
                        this.state.showFeriaYmas ?
                            <div>
                                <div className="divEspaciado">
                                    <label className="a">Total: $</label>
                                    <label className="b">{this.state.total}</label>
                                    <label className="a">Cambio: $</label>
                                    <label className="b">{this.state.cambio}</label>
                                </div>
                                <form>
                                    <div className="group">
                                        <input id="inputApagar" value={this.state.aPagar} type="text" name="Apagar" required onChange={apagarCambiante} />
                                        <span className="highlight"></span>
                                        <span className="bar"></span>
                                        <label >A pagar</label>
                                    </div>
                                </form>
                                <div className="footer">
                                    <button className="btn" onClick={() => this.finalizar()}>Finalizar</button>
                                </div>
                            </div> : null
                    }
                </div>
            </div>
        );
    }
}
