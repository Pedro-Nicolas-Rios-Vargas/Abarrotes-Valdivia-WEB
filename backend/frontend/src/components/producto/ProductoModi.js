import React, { Component } from "react";
import LabelError from "../LabelError";


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
            buscador: "",
            errorName: "hidden",
            errorExistencia: "hidden",
            errorStock: "hidden",
            errorPresentacion: "hidden",
            errorSellPrice: "hidden",
            errorProdId: "hidden",
            msmPresentacion: "",
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
                errorProdId: "hidden",
            });
        } else {
            this.setState({
                prodId: this.state.prodId,
                errorProdId: "hidden",
            })
        }
    }

    getprodName(value) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ-\d]{0,64}$/.test(value)) {
            this.setState({
                prodName: value,
                errorName: "hidden",
            });

        } else {
            this.setState({
                prodName: this.state.prodName,
                errorName: "hidden",
            })
        }
    }

    getexistencia(value) {
        if (/^(\d{0,2})?$/.test(value)) {
            this.setState({
                existencia: value,
                errorExistencia: "hidden",
            });
        } else {
            this.setState({
                existencia: this.state.existencia,
                errorExistencia: "hidden",
            })
        }
    }

    getsellPrice(value) {
        if (/^(\d{0,4})([.]\d{0,2})?$/.test(value)) {
            this.setState({
                sellPrice: value,
                errorSellPrice: "hidden",
            });
        } else {
            this.setState({
                sellPrice: this.state.sellPrice,
                errorSellPrice: "hidden",
            })
        }
    }

    getstock(value) {
        if (/^(\d{0,2})?$/.test(value)) {
            this.setState({
                stock: value,
                errorStock: "hidden",
            });
        } else {
            this.setState({
                stock: this.state.stock,
                errorStock: "hidden",
            })
        }
    }

    getpresentacion(value) {
        this.setState({
            presentacion: value,
            errorPresentacion: "hidden",
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
            if (this.state.presentacion === "Unidad" || this.state.presentacion === "Kilogramo") {
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
                alert("Datos del producto modificados con exito");
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
        const rows = clienData.map((clien) =>
            <tr key={clien.prodId}>
                <td className="child2" onClick={() => this.modiData(clien.prodId)}>{clien.prodName}</td>
                <td className="child2" onClick={() => this.modiData(clien.prodId)}>{clien.existencia}</td>
                <td className="child1" onClick={() => this.modiData(clien.prodId)}>${clien.sellPrice}</td>
                <td className="child2" onClick={() => this.modiData(clien.prodId)}>{clien.stock}</td>
                <td className="child2" onClick={() => this.modiData(clien.prodId)}>{clien.presentacion}</td>
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
                                                <LabelError visibility={this.state.errorName} msm={"Por favor, ingrese un nombre"} />
                                                <input id='prodName' value={this.state.prodName}
                                                    onChange={e => this.getprodName(e.target.value)}
                                                    type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Nombre</label>
                                            </div>

                                            <div className="group">
                                                <LabelError visibility={this.state.errorExistencia} msm={"Por favor, ingrese una existencia"} />
                                                <input id='existencia' value={this.state.existencia}
                                                    onChange={e => this.getexistencia(e.target.value)}
                                                    type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Existencia</label>
                                            </div>

                                            <div className="group">
                                                <LabelError visibility={this.state.errorSellPrice} msm={"Por favor, ingrese un precio de venta"} />
                                                <input id='sellPrice' value={this.state.sellPrice}
                                                    onChange={e => this.getsellPrice(e.target.value)}
                                                    type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Precio</label>
                                            </div>

                                            <div className="group">
                                                <LabelError visibility={this.state.errorStock} msm={"Por favor, ingrese un stock"} />
                                                <input id='stock' value={this.state.stock}
                                                    onChange={e => this.getstock(e.target.value)}
                                                    type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Stock</label>
                                            </div>

                                            <div className="group">
                                                <LabelError visibility={this.state.errorPresentacion} msm={this.state.msmPresentacion} />
                                                <input id='presentacion' list="tipo-presentacion" autoComplete="off" value={this.state.presentacion}
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
