import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import Loading from '../common/loading';

class Dashboard extends Component {
  render() {
    let { persons } = this.props.profiles;
    return persons.map(persons => <PersonCard key={persons.id} {...persons} />);
  }
}
const PersonCard = props => {
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.name}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
    </tr>
  );
};

Dashboard.propTypes = {
  profiles: PropTypes.array.isRequired
};

export default Dashboard;
