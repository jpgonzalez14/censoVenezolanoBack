import React from 'react';
import Plot from 'react-plotly.js';
//import axios from 'axios';

class GraphIngresos extends React.Component {
  componentDidMount() {
    fetch('https://censovenezolanoback.herokuapp.com/censos/estadisticas')
      .then(res => res.json())
      .then(json => {
        let datos = json.estadisticas;
        let ingresos_datos = [datos.ingresos.rango0_49, datos.ingresos.rango50_99, datos.ingresos.rango100_149, datos.ingresos.rango150_199, datos.ingresos.rango200_249, datos.ingresos.rango250_300];
        let ingresos_label = ['0-49 USD','50-99 USD','100-149 USD', '150-199 USD', '200-249 USD', '250-300 USD'];
        this.setState({
          data: [{
            values: ingresos_datos,
            labels: ingresos_label,
            name: 'Ingresos mensuales',
            hoverinfo: 'label+percent+name',
            hole: .4,
            type: 'pie'
          }],
          layout: {
            title: 'Ingresos mensuales',
            annotations: [
              {
                font: {
                  size: 18
                },
                showarrow: false,
                text: 'Ingresos (USD)',
                x: 0.5,
                y: 0.5
              }
            ],
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
          name: 'Ingresos mensuales',
          hoverinfo: 'label+percent+name',
          hole: .4,
          type: 'pie'
        }],
        layout: {
          title: 'Ingresos mensuales',
          annotations: [
            {
              font: {
                size: 18
              },
              showarrow: false,
              text: 'Ingresos (USD)',
              x: 0.5,
              y: 0.5
            }
          ],
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

export default GraphIngresos;
