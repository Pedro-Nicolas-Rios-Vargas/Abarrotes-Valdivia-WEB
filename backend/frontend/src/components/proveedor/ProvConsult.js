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
        };
        this.getProvData = this.getProvData.bind(this);

        this.getprovrId = this.getprovrId.bind(this);
        this.getprovName = this.getprovName.bind(this);
        this.getprovPhoneNum = this.getprovPhoneNum.bind(this);

        this.buscar = this.buscar.bind(this);
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

    buscar(e) {
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
    }


    render() {
        const clienData = this.state.dataTable;
        const rows = clienData.map((prov) =>
            <tr key={prov.provrId}>
                <td>{prov.provName}</td>
                <td>{prov.provPhoneNum}</td>
            </tr>
        );

        return (
            <div className="container">
                <h2>Consultar Proveedor</h2>
                <form>
                    <div className="group">
                        <input type="text" required onChange={e => this.buscar(e)}/>
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
