import React, { Component } from "react";

export default class ProductoModi extends Component {
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

    getBuscador(e) {
        this.setState({
            buscador: e.target.value,
        });
        this.buscar(e);
    }

    getprodId(value) {
        if (/^(\d{0,15})?$/.test(value)) {
            this.setState({
                prodId: value,
            });
        } else {
            this.setState({
                prodId: this.state.prodId,
            })
        }
    }

    getprodName(value) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ-\d]{0,64}$/.test(value)) {
            this.setState({
                prodName: value,
            });

        } else {
            this.setState({
                prodName: this.state.prodName,
            })
        }
    }

    getexistencia(value) {
        if (/^(\d{0,2})?$/.test(value)) {
            this.setState({
                existencia: value,
            });
        } else {
            this.setState({
                existencia: this.state.existencia,
            })
        }
    }

    getsellPrice(value) {
        if (/^(\d{0,4})([.]\d{0,2})?$/.test(value)) {
            this.setState({
                sellPrice: value,
            });
        } else {
            this.setState({
                sellPrice: this.state.sellPrice,
            })
        }
    }

    getstock(value) {
        if (/^(\d{0,2})?$/.test(value)) {
            this.setState({
                stock: value,
            });
        } else {
            this.setState({
                stock: this.state.stock,
            })
        }
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
                    data: data,
                    dataTable: data,
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
        if (this.state.prodName !== "" && this.state.existencia !== "" &&
        this.state.presentacion !== "" && this.state.sellPrice !== "" &&
        this.state.stock !== "" && this.state.prodId !== "") {
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
            fetch("/producto/update-producto/" + prodId, requiestClient)
                .then((response) => response.json())
                .then((data) => {
                    this.getProductData();
                });
            {
                this.setState({
                    show: false,
                    buscador: "",
                });
    
            }
            alert("Datos del producto modificados con exito")
        } else {
            alert("No se puede modificar un Producto sin nombre, existencia, stock, presentacion o precio");
        }

    }

    buscar(e) {
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
    }

    render() {
        const clienData = this.state.dataTable;
        const rows = clienData.map((clien) =>
            <tr key={clien.prodId}>
                <td onClick={() => this.modiData(clien.prodId)}>{clien.prodName}</td>
                <td onClick={() => this.modiData(clien.prodId)}>{clien.existencia}</td>
                <td onClick={() => this.modiData(clien.prodId)}>{clien.sellPrice}</td>
                <td onClick={() => this.modiData(clien.prodId)}>{clien.stock}</td>
                <td onClick={() => this.modiData(clien.prodId)}>{clien.presentacion}</td>
            </tr>
        );

        return (
            <div className="container">
                <h2>Modificar Producto
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
                            <th className="head">Presentación</th>
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
                                        <form>
                                            <div className="group">
                                                {/* Aqui no se si ponerle el estilo de siempre con el placeholder o que asi quede alv */}
                                                <input id='prodName' value={this.state.prodName}
                                                    onChange={e => this.getprodName(e.target.value)}
                                                    type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Nombre</label>
                                            </div>

                                            <div className="group">
                                                {/* Aqui no se si ponerle el estilo de siempre con el placeholder o que asi quede alv */}
                                                <input id='existencia' value={this.state.existencia}
                                                    onChange={e => this.getexistencia(e.target.value)}
                                                    type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Existencia</label>
                                            </div>

                                            <div className="group">
                                                {/* Aqui no se si ponerle el estilo de siempre con el placeholder o que asi quede alv */}
                                                <input id='sellPrice' value={this.state.sellPrice}
                                                    onChange={e => this.getsellPrice(e.target.value)}
                                                    type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Precio</label>
                                            </div>

                                            <div className="group">
                                                {/* Aqui no se si ponerle el estilo de siempre con el placeholder o que asi quede alv */}
                                                <input id='stock' value={this.state.stock}
                                                    onChange={e => this.getstock(e.target.value)}
                                                    type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Stock</label>
                                            </div>

                                            <div className="group">
                                                {/* Aqui no se si ponerle el estilo de siempre con el placeholder o que asi quede alv */}
                                                <input id='presentacion' list="tipo-presentacion" autocomplete="off" value={this.state.presentacion}
                                                    onChange={e => this.getpresentacion(e.target.value)}
                                                    type="text" required />
                                                <datalist id="tipo-presentacion">
                                                    <option value="Unidad"></option>
                                                    <option value="Kilogramo"></option>
                                                </datalist>
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Presentación</label>
                                            </div>
                                        </form> 
                                        <div className="footer">
                                            <button onClick={() => this.applyChanges(this.state.prodId)} className="btn">Guardar Cambios</button>
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
