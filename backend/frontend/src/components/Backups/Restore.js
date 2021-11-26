import React, { Component } from 'react';
import Loader from './Loader';
/**
 * Componente de restauracion
 */
export default class Restore extends Component{
    fileName = ""
    /**
     * Contructor dah
     * @param {Si} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            isBusy: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();  
        
    }

        /**
         * Metodo para realizar la restauracion
         * @param {*} event 
         */
        async handleSubmit(event) {
        
        event.preventDefault();
        this.setState({
            isBusy: true 
        })
        console.log(` ${this.fileInput.current.files[0].name}`);
        this.fileName = `${this.fileInput.current.files[0].name}`
        console.log(this.fileName.substr(-3))

        if(this.fileName.substr(-3) == "bak"){
            const requiestClient = {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: this.fileName
                }),
            };
            await fetch("/cliente/restore", requiestClient)
                .then((response) => response.json())
                .then((data) => console.log(data));
                setTimeout(5000)
                this.setState({
                    isBusy: false
                })
            alert("Base de datos restaurada")
        }else{
            alert("Elija solo archivos con extensión .bak")
            this.setState({
                isBusy: false
            })
        }
        
            
        }
    
      render() {
        
        return (
        <div className = "containerRestauracion">
          <form onSubmit={this.handleSubmit}>
            
              
              <input className = "upload-box" type="file" ref={this.fileInput} accept = ".bak" required/>        
           
            <button className = "btn btnRestauracion" type="submit">Restaurar</button>
            <Loader isBusy={this.state.isBusy}></Loader>
          </form>
          </div>
        );
      }
}
