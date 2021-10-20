import React, { Component } from 'react';

export default class Backup extends Component{
    respaldar() {
        console.log("working")
        fetch("/cliente/backUp").then((response) => response.json())
        alert("Respaldo generado")
    }
    render(){
    return(<div className = "containerRespaldo">
        <button onClick = {this.respaldar} className="btn btnRespaldo">Generar backup</button>
    </div>);
    }
}