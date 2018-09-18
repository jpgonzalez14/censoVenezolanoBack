import React from 'react';
import Plot from 'react-plotly.js';
//import axios from 'axios';

class PieGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          values: [300, 200, 500],
          labels: ['Residential', 'Non-Residential', 'Utility'],
          type: 'pie'
        }
      ],
      layout: {
        height: 500,
        width: 500
      },
      frames: [],
      config: {}
    };
  }

  componentWillMount() {
    fetch('https://censovenezolanoback.herokuapp.com/censos/estadisticas')
      .then(res => res.json())
      .then(findResponse => {
        var length = findResponse.estadisticas.edad.length;
        var prueba = [4];
        console.log(findResponse.estadisticas.edad);
        for (var i = 0; i < 4; i++) {
          prueba[i] = findResponse.estadisticas.edad[i];
          console.log(findResponse.estadisticas.edad[i]);
        }

        this.setState({
          values: prueba
        });
      });
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

export default PieGraph;
