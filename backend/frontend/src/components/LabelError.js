import React, { Component } from "react";

export default class LabelError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: "",
            msm: ""
        };
    }
    render() {
        return (
            <div >
                <label className="labelError" hidden={this.props.visibility}>{this.props.msm}</label>
            </div>
        );
    }
}
