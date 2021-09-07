import React, { Component } from 'react';
import ClienteAdd from "./ClienteAdd";
import ModiClient from "./ModiClient";
import ClientGet from './ClientGet';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";

export default class Cliente extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Router>
            <Switch>
                <Route exact path='/client'>
                    <p>Home Client</p>
                </Route>
                <Route path="/client/Add" component={ClienteAdd} />
                <Route path="/client/Modi" component={ModiClient} />
                <Route path="/client/consult" component={ClientGet} />
            </Switch>
        </Router>

        );
    }
}