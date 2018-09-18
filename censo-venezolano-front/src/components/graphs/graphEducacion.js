import React from 'react';
import Plot from 'react-plotly.js';
//import axios from 'axios';

class GraphEducacion extends React.Component {
  componentDidMount() {
    fetch('https://censovenezolanoback.herokuapp.com/censos/estadisticas')
      .then(res => res.json())
      .then(json => {
        let datos = json.estadisticas;
        let educacion_label = ['Ninguna','Prescolar', 'Primaria', 'Secundaria', 'Bachiller', 'Superior'];
        let educacion_datos = [datos.educacion.ninguna, datos.educacion.prescolar, datos.educacion.primaria, datos.educacion.secundaria, datos.educacion.bachiller, datos.educacion.superior];
        this.setState({
          data: [{
            values: educacion_datos,
            labels: educacion_label,
            type: 'pie'
          }],
          layout: {
            title: 'Nivel educativo',
            height: 600,
            width: 800
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
          values: [],
          labels: [],
          type: 'pie'
        }],
        layout: {
          title: 'Nivel educativo',
          height: 600,
          width: 800
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

export default GraphEducacion;
