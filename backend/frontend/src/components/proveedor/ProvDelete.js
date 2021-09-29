import React, { Component } from "react";

export default class ProvGet extends Component {
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
        const provData = this.state.data;
        const rows = provData.map((prov) =>
            <tr key={prov.provrId}>
                <td>{prov.provName}</td>
                <td>{prov.provPhoneNum}</td>
                <td>
                    <button onClick={() => this.deleteData(prov.provrId)} className="btn btn-delete" >Eliminar</button>
                    {/* <button onClick={() => this.modiData(prov.provrId)} className="btn btn-modifi">Modificar</button> */}
                </td>
            </tr>
        );

        return (
            <div>
                <table className="tablaClientes">
                    <thead>
                        <tr>
                            <th className="head">Nombres</th>
                            <th className="head">Telefono</th>
                            <th className="head">Opciones</th>
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
                                        <div className="textBox">
                                            <input id='provrId' value={this.state.provrId} onChange={e => this.getprovrId(e.target.value)} type="text" placeholder="ID" disabled></input>
                                            <input id='provName' value={this.state.provName} onChange={e => this.getprovName(e.target.value)} type="text" placeholder="Jesus Alonso"></input>
                                            <input id='provPhoneNum' value={this.state.provPhoneNum} onChange={e => this.getprovPhoneNum(e.target.value)} type="text" placeholder="5555555555"></input>                                        </div>
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