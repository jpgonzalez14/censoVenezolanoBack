import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import classnames from 'classnames';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  //component state
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      gettoken: true,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
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

    const loginRequest = {
      email: this.state.email,
      password: this.state.password,
      gettoken: true
    };
    if (loginRequest.email !== '' && loginRequest.password !== '') {
      this.props.loginUser(loginRequest);
    }
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="container-fluid">
        <br />
        <br />
        <h1 className="primary-text-color">Login</h1>
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="secondary-text-color">Email address</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label className="secondary-text-color">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
