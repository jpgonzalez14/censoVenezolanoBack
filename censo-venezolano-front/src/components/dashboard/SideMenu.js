import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class SideMenu extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    console.log(user);
    const authLinks = (
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title primary-text-color">{user.name}</h1>
            <p className="card-text">
              <strong className="secondary-text-color"> Email: </strong>{' '}
              {user.email}
            </p>
          </div>
        </div>
        <br />
        <div className="alert alert-success" role="alert">
          Que gusto es tenerte de vuelta <strong> {user.name}</strong>, recuerda
          que necesitamos de tu ayuda para verificar los datos de las personas
          censadas.
        </div>
        <div className="alert alert-primary" role="alert">
          Proximamente tendremos <strong>mas filtros de busqueda.</strong>
        </div>
        <div className="alert alert-danger" role="alert">
          La informacion que esta viendo es <strong>confidencial</strong>,
          recuerda que no debes compartirla.
        </div>
      </div>
    );
    return (
      <div className="col-xs-12 col-md-4">
        <br />
        <br /> {authLinks} <br />
      </div>
    );
  }
}

SideMenu.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SideMenu);
