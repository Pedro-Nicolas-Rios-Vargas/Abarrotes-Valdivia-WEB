import React, { Component } from "react";
/**
 * Clase para buscar proveedor
 */
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
    /**
     * Metodo para conseguir el id
     * @param {*} value 
     */
    getprovrId(value) {
        this.setState({
            provrId: value
        });
    }
    /**
     * Metodo para conseguir el nombre
     * @param {*} e 
     */
    getprovName(value) {
        this.setState({
            provName: value
        });
    }
    /**
     * Metodo para conseguir numero de telefono del producto
     * @param {*} e 
     */
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
    /**
     * Metodo para obtener los datos de la BD
     */
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
    /**
     * Si
     */
    componentDidMount() {
        this.getProvData();
    }
    /**
     * Metodo para buscar y filtrar
     * @param {*} e 
     */
    buscar(e) {
        if (/^[a-zA-Z.áéíóúÁÉÍÚÓÑñ-\d\s]{0,32}$/.test(e.target.value)) {
            this.setState({
                provName: e.target.value,
            });
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
            this.setState({ provName: this.state.provName });
        }
    }


    render() {
        const clienData = this.state.dataTable;
        const rows = clienData.map((prov) =>
            <tr key={prov.provrId}>
                <td className="child2">{prov.provName}</td>
                <td className="child2">{prov.provPhoneNum}</td>
            </tr>
        );

        return (
            <div className="container">
                <h2>Consultar Proveedor</h2>
                <form>
                    <div className="group">
                        <input type="text" required value={this.state.provName} onChange={e => this.buscar(e)}/>
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
