import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
//import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerPerson } from '../../actions/authActions';

class Censo extends Component {
  //component state
  constructor() {
    super();
    this.state = {
      name: '',
      id: '',
      phone: '',
      email: '',
      edad: '',
      queHace: '',
      educacion: 'Ninguna',
      profesion: 'Ninguna',
      enfermedades: 'Ninguna',
      ingresos: '',
      fechaIngreso: '',
      pais: '',
      person: '',
      ciudad: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //on change, every time the user enter a parameter.
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      id: this.state.id,
      phone: this.state.phone
    };
    const newCenso = {
      edad: this.state.edad,
      queHace: this.state.queHace,
      educacion: this.state.educacion,
      profesion: this.state.profesion,
      enfermedades: this.state.enfermedades,
      fechaIngreso: this.state.enfermedades,
      pais: this.state.enfermedades,
      ciudad: this.state.enfermedades,
      person: this.state.id,
      ingresos: this.state.ingresos
    };
    if (
      newUser.name !== '' &&
      newUser.email !== '' &&
      newUser.id !== '' &&
      newUser.phone !== '' &&
      newCenso.edad !== '' &&
      newCenso.queHace !== '' &&
      newCenso.educacion !== '' &&
      newCenso.profesion !== '' &&
      newCenso.enfermedades !== '' &&
      newCenso.fechaIngreso !== '' &&
      newCenso.pais !== '' &&
      newCenso.ciudad !== '' &&
      newCenso.ingresos !== ''
    ) {
      this.props.registerPerson(newUser, newCenso, this.props.history);
    }
  }

  render() {
    const { errors } = this.state;

    //const { user } = this.props.auth;

    return (
      <div className="container-fluid">
        <br />
        <br />
        <h1 className="primary-text-color">Ingresa tus datos:</h1>
        <small className="secondary-text-color">
          Todos los campos son obligatorios
        </small>
        <br />
        <br />
        <h5 className="primary-text-color">Informacion de contacto:</h5>
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="secondary-text-color">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa tu nombre"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="secondary-text-color">Id</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa tu cedula"
                name="id"
                value={this.state.id}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="secondary-text-color">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="secondary-text-color">Phone</label>
              <input
                type="number"
                className="form-control"
                placeholder="Numero de telefono"
                name="phone"
                value={this.state.phone}
                onChange={this.onChange}
              />
            </div>
          </div>

          <hr />

          <h5 className="primary-text-color">Informacion personal:</h5>
          <br />
          <div className="form-row">
            <div className="form-group col-md-2">
              <label className="secondary-text-color">Edad</label>
              <input
                type="number"
                className="form-control"
                placeholder="Edad"
                name="edad"
                min="0"
                max="130"
                value={this.state.edad}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group col-md-5">
              <label className="secondary-text-color" htmlFor="prof">
                Profesion:
              </label>
              <select
                className="form-control"
                id="prof"
                name="enfermedades"
                onChange={this.onChange}
              >
                <option value={'Ninguno'}>Ninguno</option>
                <option value={'Arquitecto'}>Arquitecto</option>
                <option value={'Carpintero'}>Carpintero</option>
                <option value={'Medico'}>Medico</option>
                <option value={'Ingeniero'}>Ingeniero</option>
                <option value={'Policia'}>Policia</option>
                <option value={'Mecanico'}>Mecanico</option>
                <option value={'Profesor'}>Profesor</option>
              </select>
            </div>
            <div className="form-group col-md-5">
              <label className="secondary-text-color" htmlFor="edu">
                Ultimo nivel de educacion:
              </label>
              <select
                className="form-control"
                id="edu"
                name="enfermedades"
                onChange={this.onChange}
              >
                <option value={'Ninguna'}>Ninguna</option>
                <option value={'Bachiller'}>Bachiller</option>
                <option value={'Pregrado'}>Pregrado</option>
                <option value={'Posgrado'}>Posgrado</option>
                <option value={'Maestria'}>Maestria</option>
                <option value={'Doctorado'}>Doctorado</option>
              </select>
            </div>

            <div className="form-group col-md-7">
              <label className="secondary-text-color">Trabajo actual</label>
              <input
                type="text"
                className="form-control"
                placeholder="En que esta trabajando actualmente"
                name="queHace"
                value={this.state.queHace}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group col-md-5">
              <label className="secondary-text-color">Ingresos</label>
              <input
                type="number"
                className="form-control"
                placeholder="Ingresos en dolares"
                name="ingresos"
                min="0"
                max="99999999999999"
                value={this.state.ingresos}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group col-md-12">
              <label className="secondary-text-color" htmlFor="enf">
                Enfermedades:
              </label>
              <select
                className="form-control"
                id="enf"
                name="enfermedades"
                onChange={this.onChange}
              >
                <option value={'Ninguna'}>Ninguna</option>
                <option value={'Diabetes'}>Diabetes</option>
                <option value={'Alzheimer'}>Alzheimer</option>
                <option value={'Parkinson'}>Parkinson</option>
                <option value={'Hipertensión'}>Hipertensión</option>
                <option value={'Colesterol'}>Colesterol</option>
                <option value={'Cancer'}>Cancer</option>
              </select>
            </div>
          </div>

          <hr />

          <h5 className="primary-text-color">Lugar donde emigra:</h5>
          <br />
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="secondary-text-color">Ciudad</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el nombre de la ciudad"
                name="ciudad"
                value={this.state.ciudad}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label className="secondary-text-color" htmlFor="paiss">
                Pais
              </label>
              <select
                className="form-control"
                id="paiss"
                name="pais"
                onChange={this.onChange}
              >
                <option>Seleccione un pais</option>
                <option value={'Argentina'}>Argentina</option>
                <option value={'Bolivia'}>Bolivia</option>
                <option value={'Brasil'}>Brasil</option>
                <option value={'Chile'}>Chile</option>
                <option value={'Colombia'}>Colombia</option>
                <option value={'Ecuador'}>Ecuador</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label className="secondary-text-color">Fecha de Ingreso</label>
              <input
                className="form-control"
                type="date"
                data-date=""
                data-date-format="DD MMMM YYYY"
                name="fechaIngreso"
                value={this.state.fechaIngreso}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group" />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <br />
      </div>
    );
  }
}

registerPerson.propTypes = {
  registerPerson: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerPerson }
)(withRouter(Censo));
