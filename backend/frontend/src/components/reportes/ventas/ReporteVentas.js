import React, { Component } from 'react';
import {
    Chart,
    LinearScale,
    BarController,
    BarElement,
    CategoryScale
} from 'chart.js'
import { Bar } from "react-chartjs-2";

Chart.register(LinearScale, BarController, BarElement, CategoryScale);

export default class ReporteVentas extends Component {
    constructor(props) {
        super(props);

        this.months = ['Enero', 'Febrero',
            'Marzo', 'Abril',
            'Mayo', 'Junio',
            'Julio', 'Agosto',
            'Septiembre', 'Octubre',
            'Noviembre', 'Diciembre'
        ];
        // flagTypeGraph
        //      0           dia
        //      1           mes
        //      2           año
        this.flagTypeGraph = 0;
        this.state = {
            msg: '',
            fechaInicial: '',
            fechaFinal: '',
            rawData: [],
            labels: [],
            datos: [],
            data: {
                labels: [],
                datasets: [{
                    label: 'Ingresos Bruto',
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1
                }],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        ticks: {
                            beginAtZero: true,
                        }
                    }
                }
            },
            BarsBackgrounColors: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            BarsBorderColors: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
        };

        this.makingGraphics = this.makingGraphics.bind(this);
        this.assignFechaInicial = this.assignFechaInicial.bind(this);
        this.assignFechaFinal = this.assignFechaFinal.bind(this);
        this.validatingDates = this.validatingDates.bind(this);
        this.syncData = this.syncData.bind(this);
        this.formatingData = this.formatingData.bind(this);
        this.makingColors = this.makingColors.bind(this);
        this.handleErrorDiv = this.handleErrorDiv.bind(this);
        this.responseHandler = this.responseHandler.bind(this);
        this.handleNoErrorDiv = this.handleNoErrorDiv.bind(this);
    }

    assignFechaInicial(event) {
        this.setState({
            fechaInicial: event.target.value,
        });
    }

    assignFechaFinal(event) {
        this.setState({
            fechaFinal: event.target.value,
        });
    }

    validatingDates() {
        if (this.state.fechaInicial === '') {
            // error message
            this.setState({
                msg: 'Proporcione una fecha inicial'
            });
            this.handleErrorDiv();
            return;
        } else if (this.state.fechaFinal === '') {
            // error message
            this.setState({
                msg: 'Proporcione una fecha final'
            });
            this.handleErrorDiv();
            return;
        }

        const fechaInicial = this.state.fechaInicial.split('-');
        const fechaFinal = this.state.fechaFinal.split('-');

        if (fechaInicial < fechaFinal) {

            if (fechaInicial[0] === fechaFinal[0]) { // Comparacion de años

                if (fechaInicial[1] === fechaFinal[1]) { // Comparacion de meses
                    const diaInicial = fechaInicial[2];
                    const diaFinal = fechaFinal[2];
                    let diasLabels = [];
                    for (let i = diaInicial; i <= diaFinal; i++) {
                        diasLabels.push(i.toString());
                    }
                    this.setState({
                        labels: diasLabels,
                    })
                    this.flagTypeGraph = 0;
                    // TODO: Agregar un titulo de mes y año
                } else {
                    const mesInicial = fechaInicial[1] - 1;
                    const mesFinal = fechaFinal[1];
                    const mesesLabels = this.months.slice(mesInicial, mesFinal);
                    this.setState({
                        labels: mesesLabels,
                    });
                    this.flagTypeGraph = 1;
                    // TODO: Agregar un titulo de año
                }
            } else {
                // Obteniendo los labels para diferencia de años
                const anioInicial = fechaInicial[0];
                const anioFinal = fechaFinal[0];
                let aniosLabels = [];
                for (let i = anioInicial; i <= anioFinal; i++) {
                    aniosLabels.push(i.toString());
                }
                this.setState({
                    labels: aniosLabels,
                })
                this.flagTypeGraph = 2;
            }
        } else {
            // error message
            this.setState({
                msg: 'La fecha inicial es mayor a la fecha final'
            });
            this.handleErrorDiv();
            return;
        }
        this.handleNoErrorDiv();
        this.syncData();

    }

    syncData() {
        fetch('/sellRecord/get-sellRecord')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    rawData: data,
                });
                this.formatingData();
            })
    }

    formatingData() {
        const fechaInicial = this.state.fechaInicial.split('-');
        const fechaFinal = this.state.fechaFinal.split('-');
        let totals = [];
        if (this.flagTypeGraph == 0) {
            totals = Array
                .apply(null, Array(fechaFinal[2] - fechaInicial[2] + 1))
                .map(() => { return 0; });
        } else if (this.flagTypeGraph == 1) {
            totals = Array
                .apply(null, Array(fechaFinal[1] - fechaInicial[1] + 1))
                .map(() => { return 0; });
        } else if (this.flagTypeGraph == 2) {
            totals = Array
                .apply(null, Array(fechaFinal[0] - fechaInicial[0] + 1))
                .map(() => { return 0; });
        }

        const sellRecord = this.state.rawData;
        for (let i = 0; i < sellRecord.length; i++) {
            let totalsIndex = 0;
            const venta = sellRecord[i];
            const fechaVenta = venta.sellDate.split('-');
            if (fechaVenta >= fechaInicial &&
                fechaVenta <= fechaFinal) {

                if (this.flagTypeGraph == 0) {
                    totalsIndex = fechaVenta[2] - fechaInicial[2];
                    totals[totalsIndex] += parseInt(venta.total);
                } else if (this.flagTypeGraph == 1) {
                    totalsIndex = fechaVenta[1] - fechaInicial[1];
                    totals[totalsIndex] += parseInt(venta.total);
                } else if (this.flagTypeGraph == 2) {
                    totalsIndex = fechaVenta[0] - fechaInicial[0];
                    totals[totalsIndex] += parseInt(venta.total);
                }
            }
        }
        this.setState({
            datos: totals,
        });
        this.makingColors();
    }

    makingColors() {
        const fechaInicial = this.state.fechaInicial.split('-');
        const fechaFinal = this.state.fechaFinal.split('-');
        let indexIter = 0;
        let bgColors = [];
        let borderColors = [];
        if (this.flagTypeGraph == 0) {
            indexIter = fechaFinal[2] - fechaInicial[2];
            bgColors = Array
                .apply(null, Array(indexIter))
                .map(() => { return ''; });
        } else if (this.flagTypeGraph == 1) {
            indexIter = fechaFinal[1] - fechaInicial[1];
            bgColors = Array
                .apply(null, Array(indexIter))
                .map(() => { return ''; });
        } else if (this.flagTypeGraph == 2) {
            indexIter = fechaFinal[0] - fechaInicial[0];
            bgColors = Array
                .apply(null, Array(indexIter))
                .map(() => { return ''; });
        }
        borderColors = bgColors.slice();

        for (let i = 0; i < indexIter; i++) {
            let randomRed = parseInt((Math.random() * (255 - 0))) + 0;
            let randomGreen = parseInt((Math.random() * (255 - 0))) + 0;
            let randomBlue = parseInt((Math.random() * (255 - 0))) + 0;

            bgColors[i] = `rgba(${ randomRed }, ${ randomGreen }, ${ randomBlue }, 0.2)`
            borderColors[i] = `rgba(${ randomRed }, ${ randomGreen }, ${ randomBlue }, 1)`
        }

        this.setState({
            BarsBackgrounColors: bgColors,
            BarsBorderColors: borderColors,
        })
        this.makingGraphics();
    }

    makingGraphics() {
        this.setState({
            data: {
                labels: this.state.labels,
                datasets: [{
                    label: 'Ingreso Bruto',
                    data: this.state.datos,
                    backgroundColor: this.state.BarsBackgrounColors,
                    borderColor: this.state.BarsBorderColors,
                    borderWidth: 1
                }],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        ticks: {
                            beginAtZero: true,
                        }
                    }
                }
            }
        });
    }

    handleErrorDiv() {
        let errorTag = document.querySelector(".error");
        errorTag.classList.toggle("invisible", false);
    }

    handleNoErrorDiv() {
        let errorTag = document.querySelector(".error");
        errorTag.classList.toggle("invisible", true);
    }

    responseHandler() {
        let msg = this.state.msg;
        return (
            <div className="error reportes-error invisible">
                <strong>
                    { msg }
                </strong>
            </div>
        )
    }

    componentDidMount() {
        //this.makingGraphics();
    }

    render() {
        let afterResponse = this.responseHandler();
        return (
            <div className="container">
                <h1>Reporte Ventas</h1>
                <div>
                    { afterResponse }
                </div>
                <div className="fechas">
                    <form action="">
                        <label htmlFor="FechaInicial" className="reportes-label">
                            Fecha inicial:
                        </label>
                        <div className="group">
                            <input
                                type="date"
                                required
                                value={ this.state.fechaInicial }
                                onChange={e =>  this.assignFechaInicial(e) }
                                name="FechaInicial" />
                            <span className="highlight"></span>
                            <span className="bar"></span>
                        </div>
                        <label htmlFor="FechaFinal" className="reportes-label">
                            Fecha final:
                        </label>
                        <div className="group">
                            <input
                                type="date"
                                required
                                value={ this.state.fechaFinal }
                                onChange={e => this.assignFechaFinal(e) }
                                name="FechaFinal"/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                        </div>
                    </form>
                    <div className="footer">
                        <button className="btn" onClick={e => this.validatingDates() }>Generar</button>
                    </div>
                </div>
                <section className="main-content">
                    <Bar data={ this.state.data } options={ this.state.options } redraw/>
                </section>
            </div>
        );
    }
}
