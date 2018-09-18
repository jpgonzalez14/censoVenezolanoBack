import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//redux imports
import { Provider } from 'react-redux';
import store from './store';

import jwt_decoded from 'jwt-decode';
import { logoutUser, setCurrentUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
//layout imports
import Navbar from './components/layout/Navbar';
import About from './components/layout/about';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
//auth imports
import Login from './components/auth/Login';
import Register from './components/auth/Register';
//dashboard
import Info from './components/dashboard/Info';
import Censo from './components/censo/Censo';

import './App.css';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decoded(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.herf = '/login';
  }
}

class App extends React.Component {
  /*constructor(props) {
    super(props);

  }*/
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={About} />
            <Route exact path="/estadisticas" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/censo" component={Censo} />
              <div className="container-fluid">
                <Route exact path="/dashboard" component={Info} />
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
