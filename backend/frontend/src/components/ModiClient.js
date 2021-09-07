import React, { Component } from 'react';

export default class ModiClient extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="textBox">
                    <input id='clientId' type="text"  placeholder="ID"></input>
                    <input id='clientName' type="text" placeholder="Jesus Alonso"></input>
                    <input id='clientSecondName' type="text" placeholder="Perez Guerra"></input>
                    <input id='clientEmail' type="text" placeholder="example@example.com"></input>
                    <input id='clientPhoneNum' type="text" placeholder="5555555555"></input>
                    <input id='balance' type="text" placeholder="43.13"></input>
                </div>
                <div>
                    <button type="submit">Guardar Cambios</button>
                </div>
            </div>
        );
    }
}
