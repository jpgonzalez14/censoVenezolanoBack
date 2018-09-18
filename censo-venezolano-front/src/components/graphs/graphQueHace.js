import React from 'react';
import Plot from 'react-plotly.js';
//import axios from 'axios';

class GraphQueHace extends React.Component {
  componentDidMount() {
    fetch('https://censovenezolanoback.herokuapp.com/censos/estadisticas')
      .then(res => res.json())
      .then(json => {
        let datos = json.estadisticas;
        let queHace_label = ['Nada','Que le importa','Sobrevivir','Vendedor informal','Pedir dinero','Crimen','Acompañante','Trabajo Formal','Viajar', 'Llorar'];
        let queHace_datos = [datos.queHace.nada, datos.queHace.queleimporta, datos.queHace.sobrevivir, datos.queHace.pedirdinero, datos.queHace.viajar, datos.queHace.crimen, datos.queHace.trabajoformal, datos.queHace.vendedorinformal, datos.queHace.llorar, datos.queHace.acompanante];
        this.setState({
          data: [{
            type: 'bar',
            x: queHace_datos,
            y: queHace_label,
            orientation: 'h',
            marker: {
              color: 'rgba(255,153,51,0.6)',
              width: 1
            }
          }],
          layout: {
            title: 'Que Hace Actualmente',
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
          type: 'bar',
          x: [],
          y: [],
          orientation: 'h',
          marker: {
            color: 'rgba(255,153,51,0.6)',
            width: 1
          }
        }],
        layout: {
          title: 'Que Hace Actualmente',
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

export default GraphQueHace;
