import React from 'react';
import Plot from 'react-plotly.js';
//import axios from 'axios';

class GraphPais extends React.Component {
  componentDidMount() {
    fetch('https://censovenezolanoback.herokuapp.com/censos/estadisticas')
      .then(res => res.json())
      .then(json => {
        let datos = json.estadisticas;
        let pais_label = ['Colombia','Ecuador','Peru','Argentina','Mexico','Chile','Brasil','Bolivia'];
        let pais_datos = [datos.pais.colombia, datos.pais.ecuador, datos.pais.peru, datos.pais.argentina, datos.pais.mexico, datos.pais.chile, datos.pais.brasil, datos.pais.bolivia];
        this.setState({
          data: [{
            type: 'scattergeo',
            mode: 'markers',
            locations: ['COL', 'ECU', 'PER', 'ARG', 'MEX', 'CHL', 'BRA', 'BOL'],
            hoverinfo: 'text',
            text: pais_datos.map((p,i)=>pais_label[i] + ': ' + p),
            marker: {
                size: pais_datos.map(p=>p/10),
                color: pais_datos.map(p=>p/pais_datos.reduce((a,b)=>a+b)*100),
                cmin: 0,
                cmax: 100,
                colorscale: 'Greens',
                colorbar: {
                    title: 'Poblacion venezolana',
                    ticksuffix: '%',
                    showticksuffix: 'first'
                },
                line: {
                    color: 'black'
                }
            },
            name: 'america data'
        }],
          layout: {
            title: 'Poblacion venezolana por pais',
            'geo': {
                'scope': 'america',
                'resolution': 100
            },
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
          type: 'scattergeo',
          mode: 'markers',
          locations: ['COL', 'ECU', 'PER', 'ARG', 'MEX', 'CHL', 'BRA', 'BOL'],
          hoverinfo: 'text',
          text: [],
          marker: {
              size: [],
              color: [],
              cmin: 0,
              cmax: 100,
              colorscale: 'Greens',
              colorbar: {
                  title: 'Poblacion venezolana',
                  ticksuffix: '%',
                  showticksuffix: 'first'
              },
              line: {
                  color: 'black'
              }
          },
          name: 'america data'
      }],
        layout: {
          title: 'Poblacion venezolana por pais',
          'geo': {
              'scope': 'america',
              'resolution': 100
          },
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

export default GraphPais;
