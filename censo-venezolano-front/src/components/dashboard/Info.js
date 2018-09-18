import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PersonList from './PersonList';

import SideMenu from './SideMenu';

class Info extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div className="row">
        <SideMenu />
        <PersonList />
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

export default connect(mapStateToProps)(Info);
