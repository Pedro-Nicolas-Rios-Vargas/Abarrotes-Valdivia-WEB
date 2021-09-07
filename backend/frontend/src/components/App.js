import React, { Component } from "react";
import { render } from "react-dom";
import Cliente from "./Cliente";

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <div>
            <Cliente />
        </div>
        );
    }
}

const appDiv = document.getElementById("app")
render(<App />, appDiv);