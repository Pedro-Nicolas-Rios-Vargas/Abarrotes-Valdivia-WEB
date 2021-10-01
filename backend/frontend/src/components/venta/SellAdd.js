import React, { Component, useCallback } from 'react';

export default class SellAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            dataCliente: [],
            cliente: [],
            clientId: 0,
            nombre_C: "",
            balance: 0.0,
            inputCliente: false,
            together: [],
            total: 0,
            showFeriaYmas: false,
            aPagar: 0.0,
            cambio: 0.0,
            btnMas: false,
            btnMenos: false,
            sellId: 0,
            sellDate: "",
        };

        this.getProductData = this.getProductData.bind(this);
        this.buscarProducto = this.buscarProducto.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getClientData = this.getClientData.bind(this);

        this.getprodId = this.getprodId.bind(this);
        this.getprodName = this.getprodName.bind(this);
        this.getexistencia = this.getexistencia.bind(this);
        this.getsellPrice = this.getsellPrice.bind(this);
        this.getstock = this.getstock.bind(this);
        this.getpresentacion = this.getpresentacion.bind(this);

        this.getclientId = this.getclientId.bind(this);
        this.getnombre_C = this.getnombre_C.bind(this);
        this.getbalance = this.getbalance.bind(this);
        this.agregar = this.agregar.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.actualizar = this.actualizar.bind(this);
        this.finalizar = this.finalizar.bind(this);
    }


    getnombre_C(value) {
        this.setState({
            nombre_C: value
        });
    }

    getbalance(value) {
        this.setState({
            balance: value
        });
    }

    getClientData() {
        fetch('/cliente/get-client')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    dataCliente: data
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
                this.setState({
                    data: data
                });
            });
    }

    componentDidMount() {
        this.getProductData();
        this.getClientData();
    }


    buscarProducto(prodIdBuscar) {
        // Validar de alguna forma que no vuelva a poner el mismo producto, o si lo vuelve a poner que aumente el contador
        // de dicho producto.
        // Ve como hacer para que la cantidad aumente
        if (parseInt(prodIdBuscar)) {
            console.log('Es numero');
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
                        sellPrice: aux.sellPrice,
                        cantidad: aux.cantidad + 1,
                        cliente: this.state.cliente,
                    }

                    this.setState({
                        together: listaProductos,
                    })
                    this.actualizar();
                } else {
                    const fucion = {
                        prodId: nuevoProducto.prodId,
                        prodName: nuevoProducto.prodName,
                        sellPrice: nuevoProducto.sellPrice,
                        cantidad: 1,
                        cliente: this.state.cliente,
                    }
                    listaProductos.push(fucion);
                    this.setState({
                        together: listaProductos,
                    });
                    this.actualizar()
                }

            } else {
                console.log('Es txt');
            }
        } else {
            console.log('Producto no encontrado')
        }
    }

    actualizar() {
        const paraLaFeria = this.state.together
        let total = 0
        for (let i = 0; i < paraLaFeria.length; i++) {
            const element = paraLaFeria[i];
            total = parseFloat(total) + parseFloat(element.sellPrice) * parseFloat(element.cantidad);
        }

        this.setState({
            total: total,
            cambio: total - this.state.aPagar,
        });
    }

    buscarCliente(nombre_C) {
        const nuevoCliente = this.state.dataCliente.find(cliente => cliente.nombre_C === nombre_C);
        if (nuevoCliente !== undefined) {
            this.setState({
                cliente: nuevoCliente,
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

    agregar(nombre_C, prodId) {
        if (nombre_C === "" || prodId === "") {
            console.log("Cliente o producto no seleccionado");
        } else {
            this.buscarProducto(prodId);
            this.buscarCliente(nombre_C);
            this.setState({
                showFeriaYmas: true,
                inputCliente: true
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
            console.log(listaProductos[posicion].cantidad)
            listaProductos[posicion] = {
                prodId: aux.prodId,
                prodName: aux.prodName,
                sellPrice: aux.sellPrice,
                cantidad: aux.cantidad - 1,
                cliente: this.state.cliente,
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
            sellPrice: aux.sellPrice,
            cantidad: aux.cantidad + 1,
            cliente: this.state.cliente,
        }

        this.setState({
            together: listaProductos,
        })
        this.actualizar();
    }




    finalizar() {
        function pushSellLog(together){
            return new Promise((resolve, reject) =>{
                console.log("sellLog")
                fetch('/sellLog/get-last')
                    .then(response => response.json())
                    .then((data) => {
                        console.log("asdafasdgasfksfhjgadf", data.sellId)
                        for (let i = 0; i < together.length; i++) {
                            const element = together[i];
                            const sellLog = {
                                method: 'POST',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    sellId: data.sellId,
                                    prodId: element.prodId,
                                    quantityBought: element.cantidad,
                                }),
                            };
                            fetch("/sellLog/add-sellLog", sellLog)
                                .then((response) => response.json())
                                .then((data) => console.log(data));
                        }
                    });
            });
        }

        async function mandarDB(sellRecord){
                await fetch("/sellRecord/add-sellRecord", sellRecord)
                    .then((response) => response.json())
                    .then((data) => console.log(data));
                    console.log("Termino de ejecutarse mandarDB")
        }

        async function asyncAll(cliente, total, together){
            console.log("Llamar sellRecord");
            const sellRecord = await pushSellRecord(cliente, total);
            console.log("Lamar mandarDB");
            await mandarDB(sellRecord);
            console.log("llamar sellLog");
            await pushSellLog(together);
            console.log("termino")
        }
        
        function pushSellRecord(cliente, total){
            return new Promise((resolve, reject) =>{
                console.log("sellRecord")
                let date = new Date();
                const fecha = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                //console.log(this)
                const sellRecord = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        clientId: cliente.clientId,
                        sellDate: fecha,
                        total: total,
                    }),
                };
                console.log("Termina de ejecutarse sellRecord")
                resolve(sellRecord)
            });
            
        }

        //Aqui te quedastes en validar existencia y mandar a guardar en la db
        const together = this.state.together;
        let continuar = true;
        const data = this.state.data;
        for (let i = 0; i < together.length; i++) {
            const element = together[i];
            const productoDB = data.find(data => data.prodId === element.prodId);
            if (element.cantidad > productoDB.existencia) {
                continuar = false;
                console.log("No tienes suficiente producto en existencia")
                break;
            }
        }

        if (continuar) {
            asyncAll(this.state.cliente,this.state.total, together);
        }

    }


    render() {
        const together = this.state.together;
        const tabla = [];
        const cliente = this.state.cliente;


        for (let i = 0; i < together.length; i++) {
            const element = together[i];
            const togetherAux = {
                prodId: element.prodId,
                prodName: element.prodName,
                sellPrice: element.sellPrice,
                cantidad: element.cantidad,
                cliente: cliente.nombre_C,
            }
            tabla.push(togetherAux);
        }

        // const changeCantidad = event => {
        //     const prodId = event.target.accessKey;
        //     const rowSelected = together.find(together => together.prodId === prodId);
        //     rowSelected.cantidad = parseInt(event.target.value);
        //     this.actualizar();
        // }
        const rows = tabla.map((product) =>
            <tr key={product.prodId}>
                <td>{product.prodName}</td>
                <td>{product.sellPrice}</td>
                <td>
                    {product.cantidad}
                    <button id="upCantidad" onClick={() => this.upCanitdad(product.prodId)}>+</button>
                    <button id="downCantidad" onClick={() => this.downCanitdad(product.prodId)}>-</button>
                    {/* <input type="number" id="spinnerCantidad" defaultValue={product.cantidad} accessKey={product.prodId} onChange={changeCantidad}/> */}
                </td>
                <td>{product.cliente}</td>
                <td>
                    <button onClick={() => this.removeRow(product.prodId)} className="btn btn-delete">Eliminar</button>
                </td>
            </tr>
        );

        const apagarCambiante = event => {
            const cambio = parseFloat(this.state.total - event.target.value);
            this.setState({ cambio: cambio });
        }

        return (
            <div className="SellAdd" style={{ paddingLeft: 150 }}>
                <div className="BuscarInput">
                    <label>Buscar Producto </label>
                    <input type="text" className="txtInputBuscarProducto" name="prodId" placeholder="ID o Nombre" onChange={e => this.getprodId(e.target.value)} />
                    <br />
                    <label>Buscar Cliente </label>
                    <input type="text" className="txtInputBuscarCliente" name="nombre_C" placeholder="Nombre" onChange={e => this.getnombre_C(e.target.value)} disabled={this.state.inputCliente} />
                    <br />
                    <button onClick={() => this.agregar(this.state.nombre_C, this.state.prodId)}>Agregar</button>
                </div>

                <div className="tableSellShow" >
                    <table className="tablaproducttes">
                        <thead>
                            <tr>
                                <th className="head">Nomrbe</th>
                                {/* <th className="head">Precio de compra</th> */}
                                <th className="head">Precio de venta</th>
                                <th className="head">Cantidad</th>
                                <th className="head">Cliente</th>
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
                                <label>Total: $</label>
                                <label>{this.state.total}</label>
                                <label>Cambio: $</label>
                                <label>{this.state.cambio}</label>
                                <br />
                                <form>
                                    <label>A pagar </label>
                                    <input id="inputApagar" placeholder="$120" type="text" name="Apagar" onChange={apagarCambiante} />
                                </form>
                                <button id="btnFinalizar" onClick={() => this.finalizar()}>Finalizar</button>
                            </div> : null
                    }
                </div>
            </div>
        );
    }
}