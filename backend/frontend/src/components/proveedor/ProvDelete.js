import React, { Component } from "react";

export default class ProvGet extends Component {
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
        this.deleteData = this.deleteData.bind(this);

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
                    data: data,
                    dataTable: data,
                });
            });
    }

    componentDidMount() {
        this.getProvData();
    }

    deleteData(provrId, provName) {
        if (confirm("¿Desea eliminar al Proveedor:   " + " " + provName + "?")) {
            fetch('/proveedor/delete-proveedor/' + provrId, {
                method: 'DELETE',
                body: JSON.stringify(this.state),
            }).then(response => response)
                .then((data) => {
                    if (data) {
                        this.getProvData();
                    }
                });
            alert("Proveedor eliminado con éxito");
            this.setState({buscador: ""});
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
        const provData = this.state.dataTable;
        const rows = provData.map((prov) =>
            <tr key={prov.provrId}>
                <td className="child2" onClick={() => this.deleteData(prov.provrId, prov.provName)}>{prov.provName}</td>
                <td className="child2" onClick={() => this.deleteData(prov.provrId, prov.provName)}>{prov.provPhoneNum}</td>
            </tr>
        );

        return (
            <div className="container">
                <h2>Eliminar Proveedor</h2>
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
                            <th className="head">Nombres</th>
                            <th className="head">Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}
