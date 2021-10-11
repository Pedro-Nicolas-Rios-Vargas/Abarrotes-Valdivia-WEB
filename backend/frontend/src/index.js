import React from "react";
import ReactDOM from "react-dom";
import Routes from "./components/Routes";


const appDiv = document.getElementById("app");
ReactDOM.render(
    <React.StrictMode>
        <Routes / >
    </React.StrictMode>,
    appDiv
);