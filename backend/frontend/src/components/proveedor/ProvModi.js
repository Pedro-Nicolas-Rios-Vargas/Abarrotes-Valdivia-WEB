import React, { Component } from "react";
import LabelError from '../LabelError';

export default class ProvModi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataTable: [],
            show: false,
            provrId: 0,
            provName: "",
            provPhoneNum: "",
            buscador: "",
            errorNombre: "hidden",
            errorTelefono: "hidden",
            msmTelefono: "",
        };
        this.getProvData = this.getProvData.bind(this);
        this.modiData = this.modiData.bind(this);
        this.applyChanges = this.applyChanges.bind(this);

        this.getprovrId = this.getprovrId.bind(this);
        this.getprovName = this.getprovName.bind(this);
        this.getprovPhoneNum = this.getprovPhoneNum.bind(this);

        this.buscar = this.buscar.bind(this);
        this.getBuscador = this.getBuscador.bind(this);
    }

    getBuscador(e) {
        this.setState({
            buscador: e.target.value,
            errorNombre: "hidden",
        });
        this.buscar(e);
    }

    getprovrId(value) {
        this.setState({
            provrId: value,
            errorNombre: "hidden",
       });
    }

    getprovName(value) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ-\d]{0,32}$/.test(value)) {
            this.setState({
                provName: value,
                errorNombre: "hidden",
            });
        } else {
            this.setState({
                provName: this.state.provName,
                errorNombre: "hidden",
            })
        }
    }

    getprovPhoneNum(value) {
        if (/^(\d{0,10})?$/.test(value)) {
            this.setState({
                provPhoneNum: value,
                errorTelefono: "hidden",
            });
        } else {
            this.setState({
                provPhoneNum: this.state.provPhoneNum,
                errorTelefono: "hidden",
            })
        }
    }

    getProvData() {
        fetch('/proveedor/get-proveedor')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    data: data,
                    dataTable: data,
                });
            });
    }

    componentDidMount() {
        this.getProvData();
    }

    modiData(provrId) {
        fetch('/proveedor/update-proveedor/' + provrId)
        .then(response => response.json())
        .then((data) => {
            //console.log(provrId)
            this.setState({
                provrId: provrId,
                provName: data.provName,
                provPhoneNum: data.provPhoneNum,
            });
        });
        { this.setState({ show: true }) }
    }

    applyChanges(provrId) {
        if (this.state.provName !== "" && this.state.provPhoneNum !== "") {
            if (this.state.provPhoneNum.length == 10) {
                console.log(provrId)
                const requiestClient = {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        provrId: this.state.provrId,
                        provName: this.state.provName,
                        provPhoneNum: this.state.provPhoneNum,
                    }),
                };
                fetch("/proveedor/update-proveedor/"+ provrId, requiestClient)
                .then((response) => {
                        this.getProvData();
                    });
                { this.setState({ 
                    show: false,
                    buscador: "", }) }
                alert("Datos del proveedor modificados con exito");
            } else {
                this.setState({
                    errorTelefono: "",
                    msmTelefono: "Por favor, ingrese un número de teléfono de 10 dígitos",
                });
            }
        } else  {
            if (this.state.provName === "") {
                this.setState({
                    errorNombre: "",
                });
            }
            if (this.state.provPhoneNum === "") {
                this.setState({
                    errorTelefono: "",
                    msmTelefono: "Por favor, ingrese un número de teléfono",
                });
            }
        }
    }

    buscar(e) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ-\d\s]{0,32}$/.test(e.target.value)) {
            this.setState({ buscador: e.target.value });
            const nombre = e.target.value.toLowerCase();
            const auxData = []
            for (let i = 0; i < this.state.data.length; i++) {
                const element = this.state.data[i];
                const str = element.provName.toLowerCase();
                if (str.includes(nombre)) {
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
        const rows = clienData.map((prov) =>
            <tr key={prov.provrId}>
                <td className="child2" onClick={() => this.modiData(prov.provrId)}>{prov.provName}</td>
                <td className="child2" onClick={() => this.modiData(prov.provrId)}>{prov.provPhoneNum}</td>
            </tr>
        );

        return (
            <div className="container">
                <h2>Modificar Proveedor</h2>
                <form>
                    <div className="group">
                        <input type="text" required value={this.state.buscador} onChange={e => this.getBuscador(e)}/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="head">Nombres</th>
                            <th className="head">Teléfono</th>
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
                                            <LabelError visibility={this.state.errorNombre} msm={"Por favor, ingrese un nombre"} />
                                            <input id='provName' value={this.state.provName}
                                                    onChange={e => this.getprovName(e.target.value)}
                                                    type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Nombre</label>
                                        </div>

                                        <div className="group">
                                            <LabelError visibility={this.state.errorTelefono} msm={this.state.msmTelefono} />
                                            <input id='provName' value={this.state.provPhoneNum}
                                                   onChange={e => this.getprovPhoneNum(e.target.value)}
                                                    type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Teléfono</label>
                                        </div>
                                        
                                        </form>
                                        <div className="footer">
                                            <button onClick={() => this.applyChanges(this.state.provrId)} className="btn">Guardar Cambios</button>
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
