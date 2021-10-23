import React from "react";

export default class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            text: '',
        }
    }

    onTextChanged = (e) => {
        const { item } = this.props;
        const value = e.target.value.toLowerCase();
        let suggestions = [];
        if (value.length > 0) {
            const regexp = new RegExp(`^${value}`, 'i');
            for (let i = 0; i < item.length; i++) {
                const element = item[i];
                const id = element.id.toString();
                const nombre = element.nombre.toLowerCase();
                if (id.includes(value) || nombre.includes(value)) {
                    suggestions.push(element)
                }
            }
            //suggestions = item.sort().filter(v => regexp.test(v))
            // console.log(suggestions);
        }
        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionsSelected(value) {
        const id = value.id;
        const nombre = value.nombre;
        if (this.props.data.input === 0) {
            this.setState(() => ({
                text: nombre,
                suggestions: [],
            }));
            this.props.data.retornoCliente(nombre);
        } else {
            this.setState(() => ({
                text: nombre,
                suggestions: [],
            }));
            this.props.data.retornoProducto(id);
        }
    }

    renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions === 0) {
            return null;
        }
        return (
            <ul className="AutoCompleteTextUL">
                {suggestions.map((item) => <li key={item.nombre} className="AutoCompleteTextIL" onClick={() => this.suggestionsSelected(item)} >{item.nombre}</li>)}
            </ul>
        )
    }

    render() {
        const { text } = this.state;
        return (
            <div className="group">
                <input value={text} required onChange={this.onTextChanged} type="text" />
                {this.renderSuggestions()}
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>{this.props.inputName}</label>
            </div>
        );
    }
}