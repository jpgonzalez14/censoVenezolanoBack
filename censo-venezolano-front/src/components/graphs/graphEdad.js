import React from 'react';
import Plot from 'react-plotly.js';
//import axios from 'axios';

class GraphEdad extends React.Component {
  componentDidMount() {
    fetch('https://censovenezolanoback.herokuapp.com/censos/estadisticas')
      .then(res => res.json())
      .then(json => {
        let datos = json.estadisticas;
        let edades_label = ['Niños', 'Adolescentes', 'Adultos', 'Viejos'];
        let edades_datos = [
          datos.edad.ninos,
          datos.edad.adolescentes,
          datos.edad.adultos,
          datos.edad.viejos
        ];
        this.setState({
          data: [
            {
              type: 'bar',
              x: edades_datos,
              y: edades_label,
              orientation: 'h'
            }
          ],
          layout: {
            title: 'Perfil de la poblacion',
            width: 800,
            height: 600
          },
          frames: [],
          config: {}
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          type: 'bar',
          x: [],
          y: [],
          orientation: 'h'
        }
      ],
      layout: {
        title: 'Perfil de la poblacion',
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

export default GraphEdad;
