import React from 'react';
import Plot from 'react-plotly.js';
//import axios from 'axios';

class GraphCiudad extends React.Component {
  componentDidMount() {
    fetch('https://censovenezolanoback.herokuapp.com/censos/estadisticas')
      .then(res => res.json())
      .then(json => {
        let datos = json.estadisticas;
        let ciudad_label = ['Bogota','Medellin','Cucuta','Barranquilla','Cali','Cartagena','Quito','Guayaquil','Cuencua','Santo Domingo', 'Portoviejo','Lima','Cusco', 'Callao','Arequipa','Trujillo','Buenos Aires','Mar del Plata','Cordoba','Rosario','Mendoza','Ciudad de Mexico','Xalapa', 'Veracruz','Guadalajara','Acapulco','Guanajuato','Santiago','Valparaiso','Talca','Viña del Mar','Concepcion','Salvador','Rio de Janeiro','São Paulo','Brasilia','Fortaleza','La Paz','Cochabamba','Santa Cruz','Trinidad', 'San Borja'];
        let ciudad_datos = [datos.ciudad.bogota, datos.ciudad.medellin, datos.ciudad.cucuta, datos.ciudad.barranquilla, datos.ciudad.cali, datos.ciudad.cartagena, datos.ciudad.quito, datos.ciudad.guayaquil, datos.ciudad.cuenca, datos.ciudad.santodomingo, datos.ciudad.portoviejo, datos.ciudad.lima, datos.ciudad.cusco, datos.ciudad.callao, datos.ciudad.arequipa, datos.ciudad.trujillo, datos.ciudad.buenosaires, datos.ciudad.mardelplata, datos.ciudad.cordoba, datos.ciudad.rosario, datos.ciudad.mendoza, datos.ciudad.ciudademexico, datos.ciudad.xalapa, datos.ciudad.veracruz, datos.ciudad.guadalajara, datos.ciudad.acapulco, datos.ciudad.guanajuato, datos.ciudad.santiago, datos.ciudad.valparaiso, datos.ciudad.talca, datos.ciudad.vinadelmar, datos.ciudad.concepcion, datos.ciudad.salvador, datos.ciudad.riodejaneiro,datos.ciudad.saopaulo, datos.ciudad.brasilia, datos.ciudad.fortaleza, datos.ciudad.lapaz, datos.ciudad.cochabamba, datos.ciudad.santacruz, datos.ciudad.trinidad, datos.ciudad.sanborja]
        this.setState({
          data: [{
            type: 'scatter',
            x: ciudad_datos,
            y: ciudad_label,
            mode: 'markers',
            name: 'Poblacion venezolana por ciudad',
            marker: {
              color: 'rgba(156, 165, 196, 0.95)',
              line: {
                color: 'rgba(156, 165, 196, 1.0)',
                width: 1,
              },
              symbol: 'circle',
              size: 16
            }
          }],
          layout: {
            title: 'Poblacion venezolana por ciudad',
            xaxis: {
              showgrid: false,
              showline: true,
              linecolor: 'rgb(102, 102, 102)',
              titlefont: {
                font: {
                  color: 'rgb(204, 204, 204)'
                }
              },
              tickfont: {
                font: {
                  color: 'rgb(102, 102, 102)'
                }
              },
              autotick: true,
              dtick: 10,
              ticks: 'outside',
              tickcolor: 'rgb(102, 102, 102)'
            },
            margin: {
              l: 140,
              r: 40,
              b: 50,
              t: 80
            },
            legend: {
              font: {
                size: 10,
              },
              yanchor: 'middle',
              xanchor: 'right'
            },
            width: 800,
            height: 600,
            paper_bgcolor: 'rgb(254, 247, 234)',
            plot_bgcolor: 'rgb(254, 247, 234)',
            hovermode: 'closest'
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
          type: 'scatter',
          x: [],
          y: [],
          mode: 'markers',
          name: 'Poblacion venezolana por ciudad',
          marker: {
            color: 'rgba(156, 165, 196, 0.95)',
            line: {
              color: 'rgba(156, 165, 196, 1.0)',
              width: 1,
            },
            symbol: 'circle',
            size: 16
          }
        }],
        layout: {
          title: 'Poblacion venezolana por ciudad',
          xaxis: {
            showgrid: false,
            showline: true,
            linecolor: 'rgb(102, 102, 102)',
            titlefont: {
              font: {
                color: 'rgb(204, 204, 204)'
              }
            },
            tickfont: {
              font: {
                color: 'rgb(102, 102, 102)'
              }
            },
            autotick: true,
            dtick: 10,
            ticks: 'outside',
            tickcolor: 'rgb(102, 102, 102)'
          },
          margin: {
            l: 140,
            r: 40,
            b: 50,
            t: 80
          },
          legend: {
            font: {
              size: 10,
            },
            yanchor: 'middle',
            xanchor: 'right'
          },
          width: 800,
          height: 600,
          paper_bgcolor: 'rgb(254, 247, 234)',
          plot_bgcolor: 'rgb(254, 247, 234)',
          hovermode: 'closest'
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

export default GraphCiudad;
