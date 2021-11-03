import React, { Component } from 'react';
import {
    Chart,
} from 'chart.js';

export default class ReporteProductos extends Component {
    constructor(props) {
        super(props);

        this.makingGraphics = this.makingGraphics.bind(this);
    }

    makingGraphics() {
      const labels = [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
            ];
      const data = {
              labels: labels,
              datasets: [
                      {
                        label: 'Ingresos',
                        data: [5460, 7500, 4750, 10000, 13516, 8400, 7930],
                        borderColor: 'rgb(1, 255, 0)',
                        backgroundColor: 'rgb(1, 255, 0)'
                      }
                    ],
            };
      const config = {
              type: 'bar',
              data: data,
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                title: {
                  display: true,
                  text: 'Ingreso Semestral: Enero-Junio',
                }
              }
            };
      var myChart = new Chart(
              document.getElementById('myChart'),
              config
            );
    }

    componentDidMount() {
        this.makingGraphics();
    }

    render() {
        return (
            <div className="container">
                <h1>Reporte Productos</h1>
                <div className="fechas">
                    <div className="busqueda-bar">
                        <form action="">
                            <div className="group">
                                <input type="text" name="searchbar" placeholder="Sabritones"/>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Producto:</label>
                            </div>
                            <div className="footer">
                                <button className="btn">Agregar</button>
                            </div>
                        </form>
                    </div>
                    <div className="group">
                        <form action="">
                            <label htmlFor="FechaInicial" className="reportes-label">
                                Fecha inicial:
                            </label>
                            <div className="group">
                                <input type="datetime-local" name="FechaInicial"/>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                            </div>
                            <label htmlFor="FechaFinal" className="reportes-label">
                                Fecha final:
                            </label>
                            <div className="group">
                                <input type="datetime-local" name="FechaFinal"/>
                                <span className="highlight"></span>
                                <span className="bar"></span>
                            </div>
                            <div className="footer">
                                <button className="btn">Generar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <section className="main-content">
                    <canvas id="myChart"></canvas>
                </section>
            </div>
        );
    }
}
