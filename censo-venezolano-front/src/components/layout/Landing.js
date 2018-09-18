import React, { Component } from 'react';
import GraphEdad from '../graphs/graphEdad';
import GraphEducacion from '../graphs/graphEducacion';
import GraphEnfermedades from '../graphs/graphEnfermedades';
import GraphProfesion from '../graphs/graphProfesion';
import GraphQueHace from '../graphs/graphQueHace';
import GraphPais from '../graphs/graphPais';
import GraphCiudad from '../graphs/graphCiudad';
import GraphFechaIngreso from '../graphs/graphFechaIngreso';
import GraphIngresos from '../graphs/graphIngresos';

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid offset-2">
          <h1 className="secondary-text-color">Datos estadisticos:</h1>
          <br />
          <GraphEdad />
          <GraphEducacion />
          <GraphEnfermedades />
          <GraphProfesion />
          <GraphQueHace />
          <GraphPais />
          <GraphCiudad />
          <GraphFechaIngreso />
          <GraphIngresos />
        </div>
      </div>
    );
  }
}

export default Landing;
