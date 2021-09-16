import React, { Component } from "react";

export default class ClientGet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: false,
            provId: 0,
            ProvName: "",
            provPhoneNum: "",
        };
        this.getProvData = this.getProvData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.modiData = this.modiData.bind(this);
        this.applyChanges = this.applyChanges.bind(this);

        this.getprovId = this.getprovId.bind(this)
        this.getProvName = this.getProvName.bind(this)
        this.getprovPhoneNum = this.getprovPhoneNum.bind(this)
    }

    getprovId(value) {
        this.setState({
            provId: value
       });
    }

    getProvName(value) {
        this.setState({
            ProvName: value
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

    deleteData(provId) {
        fetch('/cliente/delete-cliente/' + provId, {
            method: 'DELETE',
            body: JSON.stringify(this.state),
        }).then(response => response)
            .then((data) => {
                if (data) {
                    this.getProvData();
                }
            });
    }

    modiData(provId) {
        fetch('/cliente/update-cliente/' + provId)
        .then(response => response.json())
        .then((data) => {
            //console.log(data)
            this.setState({
                provId: data.provId,
                ProvName: data.ProvName,
                clientSecondName: data.clientSecondName,
                clientEmail: data.clientEmail,
                provPhoneNum: data.provPhoneNum,
                balance: data.balance
            });
        });
        { this.setState({ show: true }) }
    }

    applyChanges(provId) {
        const requiestClient = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                provId: this.state.provId,
                ProvName: this.state.ProvName,
                provPhoneNum: this.state.provPhoneNum,
            }),
        };
        console.log(provId);
        fetch("/cliente/update-cliente/"+ provId, requiestClient)
        .then((response) => response.json())
        .then((data) => console.log(data));
        { this.setState({ show: false }) }
    }

    render() {
        const provData = this.state.data;
        const rows = provData.map((prov) =>
            <tr key={prov.provId}>
                <td>{prov.provName}</td>
                <td>{prov.provPhoneNum}</td>
                <td>
                    {/* <button onClick={() => this.deleteData(clien.provId)} className="btn btn-delete" >Eliminar</button>
                    <button onClick={() => this.modiData(clien.provId)} className="btn btn-modifi">Modificar</button> */}
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
                                            <input id='provId' value={this.state.provId} onChange={e => this.getprovId(e.target.value)} type="text" placeholder="ID" disabled></input>
                                            <input id='ProvName' value={this.state.ProvName} onChange={e => this.getProvName(e.target.value)} type="text" placeholder="Jesus Alonso"></input>
                                            <input id='provPhoneNum' value={this.state.provPhoneNum} onChange={e => this.getprovPhoneNum(e.target.value)} type="text" placeholder="5555555555"></input>
                                        </div>
                                        <div>
                                            <button onClick={() => this.applyChanges(this.state.provId)} className="btn btn-applyChanges">Guardar Cambios</button>
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