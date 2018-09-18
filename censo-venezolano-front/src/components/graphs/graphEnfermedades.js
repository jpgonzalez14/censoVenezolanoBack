import React from 'react';
import Plot from 'react-plotly.js';
//import axios from 'axios';

class GraphEnfermedades extends React.Component {
  componentDidMount() {
    fetch('https://censovenezolanoback.herokuapp.com/censos/estadisticas')
      .then(res => res.json())
      .then(json => {
        let datos = json.estadisticas;
        let enfermedadeses_label = ['Sano','Diabetes','Desnutricion','Dengue','Zika','Fractura','Cardiaco','Respiratorio','Motriz', 'Mental', 'Chagas'];
        let enfermedades_datos = [datos.enfermedades.sano, datos.enfermedades.diabetes, datos.enfermedades.desnutricion, datos.enfermedades.dengue, datos.enfermedades.zika, datos.enfermedades.fractura, datos.enfermedades.cardiaco, datos.enfermedades.respiratorio, datos.enfermedades.motriz, datos.enfermedades.mental, datos.enfermedades.chagas];
        this.setState({
          data: [{
            x: enfermedadeses_label,
            y: enfermedades_datos,
            type: 'bar',
            marker: {
              color: 'rgb(142,124,195)'
            }
          }],
          layout: {
            title: 'Enfermedades',
            font:{
              family: 'Raleway, sans-serif'
            },
            showlegend: false,
            xaxis: {
              tickangle: -45
            },
            yaxis: {
              zeroline: true,
              gridwidth: 2
            },
            bargap :0.05,
            width: 800,
            height: 600
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
          x: [],
          y: [],
          type: 'bar',
          marker: {
            color: 'rgb(142,124,195)'
          }
        }],
        layout: {
          title: 'Enfermedades',
          font:{
            family: 'Raleway, sans-serif'
          },
          showlegend: false,
          xaxis: {
            tickangle: -45
          },
          yaxis: {
            zeroline: true,
            gridwidth: 2
          },
          bargap :0.05,
          width: 800,
          height: 600
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

export default GraphEnfermedades;
