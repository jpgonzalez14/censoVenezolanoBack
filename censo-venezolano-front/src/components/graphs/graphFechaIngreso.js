import React from 'react';
import Plot from 'react-plotly.js';
//import axios from 'axios';

class GraphFechaIngreso extends React.Component {
  componentDidMount() {
    fetch('https://censovenezolanoback.herokuapp.com/censos/estadisticas')
      .then(res => res.json())
      .then(json => {
        let datos = json.estadisticas;
        let fechaIngreso_datos = [datos.fechaIngreso.enero_2016, datos.fechaIngreso.febrero_2016, datos.fechaIngreso.marzo_2016, datos.fechaIngreso.abril_2016,datos.fechaIngreso.mayo_2016,datos.fechaIngreso.junio_2016, datos.fechaIngreso.julio_2016, datos.fechaIngreso.agosto_2016, datos.fechaIngreso.septiembre_2016, datos.fechaIngreso.octubre_2016, datos.fechaIngreso.noviembre_2016, datos.fechaIngreso.diciembre_2016,datos.fechaIngreso.enero_2017, datos.fechaIngreso.febrero_2017, datos.fechaIngreso.marzo_2017, datos.fechaIngreso.abril_2017,datos.fechaIngreso.mayo_2017,datos.fechaIngreso.junio_2017, datos.fechaIngreso.julio_2017, datos.fechaIngreso.agosto_2017, datos.fechaIngreso.septiembre_2017, datos.fechaIngreso.octubre_2017, datos.fechaIngreso.noviembre_2017, datos.fechaIngreso.diciembre_2017,datos.fechaIngreso.enero_2018, datos.fechaIngreso.febrero_2018, datos.fechaIngreso.marzo_2018, datos.fechaIngreso.abril_2018,datos.fechaIngreso.mayo_2018,datos.fechaIngreso.junio_2018, datos.fechaIngreso.julio_2018, datos.fechaIngreso.agosto_2018, datos.fechaIngreso.septiembre_2018, datos.fechaIngreso.octubre_2018, datos.fechaIngreso.noviembre_2018, datos.fechaIngreso.diciembre_2018];
        let fechaIngresos_label = ['enero-2016', 'febrero-2016','marzo-2016','abril-2016','mayo-2016','junio-2016','julio-2016','agosto-2016','septiembre-2016','octubre-2016','noviembre-2016','diciembre-2016','enero-2017', 'febrero-2017','marzo-2017','abril-2017','mayo-2017','junio-2017','julio-2017','agosto-2017','septiembre-2017','octubre-2017','noviembre-2017','diciembre-2017','enero-2018', 'febrero-2018','marzo-2018','abril-2018','mayo-2018','junio-2018','julio-2018','agosto-2018','septiembre-2018','octubre-2018','noviembre-2018','diciembre-2018'];
        this.setState({
          data: [{
            type: "scatter",
            mode: "lines",
            name: 'Fecha de ingreso',
            x: fechaIngresos_label,
            y: fechaIngreso_datos,
            line: {color: '#17BECF'}
          }],
          layout: {
            title: 'Inmigracion venezolana por fecha',
            width: 800,
            height: 600,
            xaxis: {
              autorange: false,
              range: ['2016-01-01', '2018-12-28'],
              rangeslider: {range: ['2016-01-01', '2018-12-28']},
              type: 'Number'
            },
            yaxis: {
              autorange: true,
              range: [0, 50],
              type: 'linear'
            }
          },
          frames: [],
          config: {}
        })
      });
  }

  constructor(props) {
    super(props);
    this.state = {
        data: [{
          type: "scatter",
          mode: "lines",
          name: 'Fecha de ingreso',
          x: [],
          y: [],
          line: {color: '#17BECF'}
        }],
        layout: {
          title: 'Inmigracion venezolana por fecha',
          width: 800,
          height: 600,
          xaxis: {
            autorange: false,
            range: [],
            rangeslider: {range: []},
            type: 'Number'
          },
          yaxis: {
            autorange: true,
            range: [0, 50],
            type: 'linear'
          }
        },
        frames: [],
        config: {}
      };
  }

  render() {
    return (
      <Plot
        data={this.state.data}
        layout={this.state.layout}
        frames={this.state.frames}
        config={this.state.config}
        onInitialized={figure => this.setState(figure)}
        onUpdate={figure => this.setState(figure)}
      />
    );
  }
}

export default GraphFechaIngreso;
