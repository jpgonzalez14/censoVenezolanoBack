import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PersonList from './PersonList';

import SideMenu from './SideMenu';

class Info extends Component {

  render() {
    return (
      <div className="row">
        <SideMenu />
        <PersonList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Info);
