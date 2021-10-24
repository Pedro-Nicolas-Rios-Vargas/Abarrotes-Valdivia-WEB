import React, { Component, useState } from 'react';
import AutoComplete from './AutoComplete';
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
            mandarCliente: [],
            mandarProductos: [],
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
        this.actualizarCliente = this.actualizarCliente.bind(this);
        this.movement = this.movement.bind(this);
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
                const juntar = [];
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    const aux = {
                        id: element.clientId,
                        nombre: element.nombre_C
                    }
                    juntar.push(aux)
                }
                this.setState({
                    dataCliente: data,
                    mandarCliente: juntar,
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

    componentDidMount() {
        this.getProductData();
        this.getClientData();
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
                        existencia: nuevoProducto.existencia,
                        sellPrice: nuevoProducto.sellPrice,
                        stock: nuevoProducto.stock,
                        presentacion: nuevoProducto.presentacion,
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
                //console.log('Es txt');
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

    agregar() {
        if (this.state.nombre_C === "" || this.state.prodId === "") {
            alert("Cliente o producto no seleccionado");
        } else {
            this.actualizar();
            this.buscarProducto(this.state.prodId);
            this.buscarCliente(this.state.nombre_C);
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
            //console.log(listaProductos[posicion].cantidad)
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
            cliente: this.state.cliente,
        }

        this.setState({
            together: listaProductos,
        })
        this.actualizar();
    }

    async movement(cliente, total) {
        let date = new Date();
        const fecha = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        const movementClient = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId: cliente.clientId,
                dateTransaction: fecha,
                total: total,
            }),
        };
        await fetch("/cuenta/add-movement", movementClient)
            .then((response) => response.json())
            .then((data) => console.log(data))
    }

    async actualizarCliente(cliente, total) {
        console.log("Lo que recibe el metodo:", total)
        const requiestClient = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clientId: cliente.clientId,
                nombre_C: cliente.nombre_C,
                balance: total
            }),
        };
        await fetch("/cliente/update-cliente/" + cliente.clientId, requiestClient)
            .then((response) => {
            });
    }

    finalizar() {

        function pushSellLog(together) {
            return new Promise((resolve, reject) => {
                //console.log("sellLog")
                fetch('/sellLog/get-last')
                    .then(response => response.json())
                    .then((data) => {
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

                            console.log("Producto a actualizar existencia: ", element)
                            const producto = {
                                method: 'PUT',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    prodId: element.prodId,
                                    prodName: element.prodName,
                                    existencia: element.existencia - element.cantidad,
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

        async function mandarDB(sellRecord) {
            await fetch("/sellRecord/add-sellRecord", sellRecord)
                .then((response) => response.json())
                .then((data) => console.log(data));
            //console.log("Termino de ejecutarse mandarDB")
        }

        async function asyncAll(cliente, total, together) {
            //console.log("Llamar sellRecord");
            const sellRecord = await pushSellRecord(cliente, total);
            //console.log("Lamar mandarDB");
            await mandarDB(sellRecord);
            //console.log("llamar sellLog");
            await pushSellLog(together);
            //console.log("termino")
            //await movement(cliente, total)
        }

        function pushSellRecord(cliente, total) {
            return new Promise((resolve, reject) => {
                //console.log("sellRecord")
                let date = new Date();
                const fecha = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                const sellRecord = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        clientId: cliente.clientId,
                        sellDate: fecha,
                        total: total,
                    }),
                };
                //console.log("Termina de ejecutarse sellRecord")
                resolve(sellRecord)
            });

        }

        const together = this.state.together;
        let continuar = true;
        const data = this.state.data;
        for (let i = 0; i < together.length; i++) {
            const element = together[i];
            const productoDB = data.find(data => data.prodId === element.prodId);
            if (element.cantidad > productoDB.existencia) {
                continuar = false;
                alert("No tiene suficiente existencia del producto: \n" + (element.prodName).toString());
                break;
            }
        }


        if (continuar) {
            if (this.state.cambio === 0) {
                asyncAll(this.state.cliente, this.state.total, together);
                //En este caso es no se agrega nada a movement y no hay cambio, es una compra normal
            } else if (this.state.cambio < 0) {
                if (this.state.cliente.balance > 0) {
                    alert("El cliente tiene saldo acredor suficiente para abonar\nPor lo que el saldo actual del cliente es: " + (this.state.cliente.balance - Math.abs(this.state.cambio)).toString());
                    this.movement(this.state.cliente, this.state.cambio);
                    this.actualizarCliente(this.state.cliente, this.state.cliente.balance - Math.abs(this.state.cambio));
                    asyncAll(this.state.cliente, this.state.total, together);
                    //Aqui mandar a llamar al emtodo para hacer el movement, restando el saldo del cliente y restarle al cliente el saldo 
                    //que se uso para pagar por lo que en movement saldra que se resto el cambio es decir this.state.cambio
                    //y el saldo del cliente actual sera el console.log de arriba xd

                    //poner aqui metodo o instrucciones para poner en la forma base ventas

                } else {
                    if (confirm("Falta dinero por pagar\n ¿Desea agregar el dinero faltante como saldo deudor del cliente?")) {
                        alert("El saldo deudor del cliente a aumentado.\n Ahora cuenta con un saldo de: " + (this.state.cambio).toString());
                        this.movement(this.state.cliente, this.state.cambio);
                        this.actualizarCliente(this.state.cliente, this.state.cliente.balance - Math.abs(this.state.cambio));
                        asyncAll(this.state.cliente, this.state.total, together);

                        //poner aqui metodo o instrucciones para poner en la forma base ventas

                        //console.log("Hacer la llamada al metodo para actualizar movement, copear de clienteModi y terminar la venta con los metodos culeros asincronos");
                        //LLamar al metodo movement, y el saldo del cliente sera el cambio mas el posible saldo negativo que tenga xd
                        //Y en movement poner en transaccion el cambio
                    } else {
                        alert("Dinero faltante para realizar la venta")
                    }
                }
            } else if (this.state.cambio > 0) {
                if (confirm("Cambio sobrante\n ¿Desea agregar el cambio sobrante como saldo acredor del cliente?")) {
                    alert("Se a agregado saldo acredor al cliente. \n Ahora cuenta con un saldo de: " + (this.state.cambio).toString());
                    this.movement(this.state.cliente, parseFloat(this.state.cambio));
                    this.actualizarCliente(this.state.cliente, parseFloat(parseFloat(this.state.cliente.balance) + parseFloat(this.state.cambio)).toFixed(2));
                    asyncAll(this.state.cliente, this.state.total, together);
                    //console.log("Hacer la llamada al metodo para actualizar movement, copear de clienteModi y terminar la venta con los metodos culeros asincronos");
                    //Este caso no creo que pase nunca, pero por si se da el caso, hay que poner en el saldo del movement el cambio positivo y sumar el saldo positivo 
                    //Al saldo actual del cliente, por lo que si el cliente tiene saldo negativo este se convertira en positivo o en negativo si el cambio no es lo
                    //suficiente para que el saldo sea positivo xd
                } else {
                    alert("El cambio es: " + (this.state.cambio));
                    //asyncAll(this.state.cliente, this.state.total, together);
                    //Aqui llamaar a la venta normal pero sin ningun cambio en el movement del cliente
                }
            }
            //console.log(this.state.cliente)

        }

    }

    retornoCliente(r) {
        this.setState({ nombre_C: r })
        this.buscarCliente(r);
    }

    retornoProducto(r) {
        this.setState({ prodId: r });
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
                <h2>Ventas</h2>
                <form>
                    {/* ['Pepe','Pene', 'Pedro', 'pixiv'] */}
                    <AutoComplete item={this.state.mandarCliente} inputName={"Nombre del Cliente"} data={{ input: 0, retornoCliente: this.retornoCliente.bind(this) }} />
                    {/* <div className="group">
                        <input type="text" required onChange={e => this.getprodId(e.target.value)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>ID o Nombre del producto</label>
                    </div> */}
                    {/* <div className="group">
                        <input className="diabled" type="text" required onChange={e => this.getnombre_C(e.target.value)} disabled={this.state.inputCliente} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label className="disable">Nombre del cliente</label>
                    </div> */}
                    <AutoComplete item={this.state.mandarProductos} inputName={"ID o Nombre del producto"} data={{ input: 1, retornoProducto: this.retornoProducto.bind(this) }} />
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
                                <th className="head">Precio de venta</th>
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
