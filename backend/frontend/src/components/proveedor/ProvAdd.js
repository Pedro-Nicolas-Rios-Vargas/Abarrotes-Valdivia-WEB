import React, { Component } from 'react';

export default class ClienteAdd extends Component {
    defaultName = ""
    defaultPhoneNum = ""
    constructor(props) {
        super(props);
        this.state = {
            provName: this.defaultName,
            provPhoneNum: this.defaultPhoneNum,
        }

        this.AddProv = this.AddProv.bind(this);
        this.getNameProv = this.getNameProv.bind(this);
        this.getprovPhoneNum = this.getprovPhoneNum.bind(this)
    }

    getNameProv(e) {
        this.setState({
            provName: e.target.value,
        });
    }

    getprovPhoneNum(e) {
        if (/^(\d{0,10})?$/.test(e.target.value)) {
            this.setState({
                provPhoneNum: e.target.value,
            });
        } else {
            this.setState({
                provPhoneNum: this.state.provPhoneNum,
            })
        }
    }

    AddProv() {
        //console.log(this)
        if (this.state.provName !== "" || this.state.provPhoneNum !== "") {
            const requiestClient = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    provName: this.state.provName,
                    provPhoneNum: this.state.provPhoneNum,
                }),
            };
            fetch("/proveedor/add-proveedor", requiestClient)
                .then((response) => response.json())
                .then((data) => console.log(data));

            alert("Proveedor agregado con exito");

            this.setState({
                provName: "",
                provPhoneNum: "",
            });
        } else {
            alert("No se puede agregar un Proveedor sin nombre o numero de telefon")
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Agregar Proveedor
                    <small>Datos del Proveedor</small>
                </h2>
                <form>
                    <div className="group">
                        <input type="text" required name="provName" value={this.state.provName} onChange={e => this.getNameProv(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Nombre</label>
                    </div>

                    <div className="group">
                        <input type="text" required name="provPhoneNum" value={this.state.provPhoneNum} onChange={e => this.getprovPhoneNum(e)} />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Telefono</label>
                    </div>
                </form>
                <div className="footer">
                    <button className="btn" onClick={() => this.AddProv()} >Agregar</button>
                </div>
            </div>
        );
    }
}
