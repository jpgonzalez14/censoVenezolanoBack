import React from 'react';
//import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPersons } from '../../actions/authActions';
import Dashboard from './Dashboard';

class PersonList extends React.Component {
  componentWillMount() {
    this.props.getAllPersons();
  }

  render() {
    let { profiles, loading } = this.props.profiles;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = (
        <tr>
          <th scope="row">Loading</th>
          <td>Loading</td>
          <td>Loading</td>
          <td>Loading</td>
        </tr>
      );
    } else {
      profileItems = <Dashboard profiles={profiles} />;
    }

    return (
      <div className="col-xs-12 col-md-8">
        <br />
        <h2 className="primary-text-color">Lista de personas censadas</h2>
        <p>Aqui podras filtar algunos parametros de la informacion:</p>
        <input
          class="form-control"
          id="myInput"
          type="text"
          placeholder="Search.."
        />
        <br />
        <div className="table-wrapper-scroll-y">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="secondary-text-color" scope="col">
                  Id
                </th>
                <th className="secondary-text-color" scope="col">
                  Name
                </th>
                <th className="secondary-text-color" scope="col">
                  Email
                </th>
                <th className="secondary-text-color" scope="col">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>{profileItems}</tbody>
          </table>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

const PersonCard = props => {
  const { persons } = this.props;
  return persons.map(
    <tr>
      <th scope="row">{persons.id}</th>
      <td>{persons.name}</td>
      <td>{persons.email}</td>
      <td>{persons.phone}</td>
    </tr>
  );
};

PersonList.propTypes = {
  getAllPersons: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired
};

let mapStatetoProps = state => ({
  profiles: state.profile
});

export default connect(
  mapStatetoProps,
  { getAllPersons }
)(PersonList);
