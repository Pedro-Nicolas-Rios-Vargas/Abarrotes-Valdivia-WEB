import React, { Component, useState } from 'react';
import AutoComplete from './AutoComplete';
export default class SellAdd extends Component {

    constructor(props) {
        super(props);

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
    }


    getProvName(value) {
        this.setState({
            provName: value
        });
    }

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

    getclientId(value) {
        this.setState({
            clientId: value
        });
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

    initSocketServer() {
        let request = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mensaje: "Hoal",
            }),
        };
        fetch('/socket/barcode-request', request).
            then((response) => {
                return response.json();
            }).
            then((data) => {
                this.setState({
                    prodId: data.Barcode
                });
                console.log('barcode:', this.state.prodId);
                this.agregar(this.state.nombre_C, this.state.prodId)
            });
    }

    componentDidMount() {
        this.getProductData();
        this.initSocketServer();
        this.getProvData();
    }


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
                        sellPrice: nuevoProducto.sellPrice,
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
                total: total2,
                cambio: this.state.aPagar - total2,
            });
        }
    }

    baseState() {
        this.setState(({
            together: [],
            total: 0,
            cambio: 0,
            prov: {},
            showFeriaYmas: false,
            aPagar: 0,
            provName: "",
            prodName: "",
            reset: "",
        }));
        this.clearInput1();
        this.clearInput();
    }

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
    }

    agregar() {
        if (this.state.provName === "" || this.state.prodId === "") {
            alert("Cliente o producto no seleccionado");
        } else {
            this.actualizar();
            this.buscarProducto(this.state.prodId);
            this.buscarCliente(this.state.provName);
            this.setState({
                showFeriaYmas: true,
                inputCliente: true,
            });
        }
    }



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
            if (this.state.cambio === 0) {
                asyncAll(this.state.prov, this.state.total, together);
                this.baseState();
                //En este caso es no se agrega nada a movement y no hay cambio, es una compra normal
            } else if (this.state.cambio < 0) {
                alert("No hay dinero suficiente para pagar al proveedor")
            } else if (this.state.cambio > 0) {
                alert("El cambio es: " + (this.state.cambio).toString())
                asyncAll(this.state.prov, this.state.total, together);
                this.baseState();
            }
        }

    }

    retornoCliente(r) {
        this.setState({
            provName: r,
        });
        this.buscarCliente(r);
    }

    retornoProducto(r) {
        this.setState({
            prodId: r.id,
            prodName: r.text,
        });
    }

    clearInput1() {
        this.input1.clear();
    }

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
                <td>{product.prodName}</td>
                <td>{product.sellPrice}</td>
                <td>
                    {product.cantidad}
                    <button id="upCantidad" className="btn btn_controller" onClick={() => this.upCanitdad(product.prodId)}>+</button>
                    <button id="downCantidad" className="btn btn_controller" onClick={() => this.downCanitdad(product.prodId)}>-</button>
                </td>
                <td>
                    <button onClick={() => this.removeRow(product.prodId)} className="btn btn_confirm">Eliminar</button>
                </td>
            </tr>
        );

        const apagarCambiante = event => {

            if (/^(\d{0,4})([.]\d{0,2})?$/.test(event.target.value)) {
                const cambio = parseFloat(event.target.value - this.state.total);
                this.setState({ cambio: cambio, aPagar: event.target.value });
            } else {
                this.setState({ aPagar: this.state.aPagar })
            }
        }

        return (
            <div className="container">
                <h2>Compras</h2>
                <form>
                    <AutoComplete ref={input1 => this.input1 = input1} item={this.state.mandarProv} inputName={"Nombre del Proveedor"} data={{ input: 0, retornoCliente: this.retornoCliente.bind(this) }} />

                    <AutoComplete ref={input => this.input = input} item={this.state.mandarProductos} inputName={"ID o Nombre del producto"} data={{ input: 1, retornoProducto: this.retornoProducto.bind(this) }} />
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
                                <th className="head">Precio de compra</th>
                                <th className="head">Cantidad</th>
                                <th className="head">Opciones</th>
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
