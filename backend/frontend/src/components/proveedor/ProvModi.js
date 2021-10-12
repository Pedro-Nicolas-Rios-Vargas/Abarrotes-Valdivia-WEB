import React, { Component } from "react";

export default class ProvModi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            provrId: 0,
            provName: "",
            provPhoneNum: "",
        };
        this.getProvData = this.getProvData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.modiData = this.modiData.bind(this);
        this.applyChanges = this.applyChanges.bind(this);

        this.getprovrId = this.getprovrId.bind(this)
        this.getprovName = this.getprovName.bind(this)
        this.getprovPhoneNum = this.getprovPhoneNum.bind(this)
    }

    getprovrId(value) {
        this.setState({
            provrId: value
       });
    }

    getprovName(value) {
        this.setState({
            provName: value
       });
    }

    getprovPhoneNum(value) {
        this.setState({
            provPhoneNum: value
       });
    }

    getProvData() {
        fetch('/proveedor/get-proveedor')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    data: data
                });
            });
    }

    componentDidMount() {
        this.getProvData();
    }

    deleteData(provrId) {
        fetch('/proveedor/delete-proveedor/' + provrId, {
            method: 'DELETE',
            body: JSON.stringify(this.state),
        }).then(response => response)
            .then((data) => {
                if (data) {
                    this.getProvData();
                }
            });
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
        .then((response) => response.json());
        { this.setState({ show: false }) }
    }

    render() {
        const clienData = this.state.data;
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
                        <input type="text" required />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="head">Nombres</th>
                            <th className="head">Telefono</th>
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
                                        <from>
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
                                                <label>Nombre</label>
                                        </div>
                                        
                                        </from>
                                        <div>
                                            <button onClick={() => this.applyChanges(this.state.provrId)} className="btn btn-applyChanges">Guardar Cambios</button>
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