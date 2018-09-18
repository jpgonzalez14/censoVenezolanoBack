import React from 'react';
import Plot from 'react-plotly.js';
//import axios from 'axios';

class GraphProfesion extends React.Component {
  componentDidMount() {
    fetch('https://censovenezolanoback.herokuapp.com/censos/estadisticas')
      .then(res => res.json())
      .then(json => {
        let datos = json.estadisticas;
        let profesion_label = [
          'Ninguna',
          'Cerrajero',
          'Constructor',
          'Medico',
          'Astronauta',
          'Guardia',
          'Administrador',
          'Actor',
          'Bombero',
          'Ejecutivo',
          'Vendedor',
          'Agricultor',
          'Ingeniero',
          'Enfermera',
          'Educador',
          'Plomero'
        ];
        let profesion_datos = [
          datos.profesion.ninguna,
          datos.profesion.cerrajero,
          datos.profesion.constructor,
          datos.profesion.medico,
          datos.profesion.astronauta,
          datos.profesion.guardia,
          datos.profesion.adminitrador,
          datos.profesion.actor,
          datos.profesion.bombero,
          datos.profesion.ejecutivo,
          datos.profesion.vendedor,
          datos.profesion.agricultor,
          datos.profesion.ingeniero,
          datos.profesion.enfermera,
          datos.profesion.educador,
          datos.profesion.plomero
        ];
        this.setState({
          data: [
            {
              x: profesion_label,
              y: profesion_datos,
              mode: 'markers',
              marker: {
                size: profesion_datos.lenght
              }
            }
          ],
          layout: {
            title: 'Profesiones',
            showlegend: false,
            height: 600,
            width: 800
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
          x: [],
          y: [],
          mode: 'markers',
          marker: {
            size: []
          }
        }
      ],
      layout: {
        title: 'Profesiones',
        showlegend: false,
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

export default GraphProfesion;
