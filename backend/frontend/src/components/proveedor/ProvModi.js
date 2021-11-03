import React, { Component } from "react";

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
            buscador: ""
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
        });
        this.buscar(e);
    }

    getprovrId(value) {
        this.setState({
            provrId: value
       });
    }

    getprovName(value) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ-\d\s]{0,32}$/.test(value)) {
            this.setState({
                provName: value,
            });
        } else {
            this.setState({
                provName: this.state.provName,
            })
        }
    }

    getprovPhoneNum(value) {
        if (/^(\d{0,10})?$/.test(value)) {
            this.setState({
                provPhoneNum: value,
            });
        } else {
            this.setState({
                provPhoneNum: this.state.provPhoneNum,
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
        } else  {
            alert("No se puede modificarr un Proveedor sin nombre o numero de teléfono")
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
                <td onClick={() => this.modiData(prov.provrId)}>{prov.provName}</td>
                <td onClick={() => this.modiData(prov.provrId)}>{prov.provPhoneNum}</td>
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
                                            {/* Aqui no se si ponerle el estilo de siempre con el placeholder o que asi quede alv */}
                                            <input id='provName' value={this.state.provName}
                                                    onChange={e => this.getprovName(e.target.value)}
                                                    type="text" required />
                                                <span className="highlight"></span>
                                                <span className="bar"></span>
                                                <label>Nombre</label>
                                        </div>

                                        <div className="group">
                                            {/* Aqui no se si ponerle el estilo de siempre con el placeholder o que asi quede alv */}
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
