import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { checkAuthState, logoutUser } from "./store/actions/";

import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Blog from "./containers/Blog/Blog";
import Register from "./containers/Auth/Register";
import Login from "./containers/Auth/Login";
import Upload from "./containers/Upload/Upload";
import Aux from "./hoc/Aux";
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }
  render() {
    return (
      <Router>
        <Aux>
          <Navbar auth={this.props.auth} logout={() => this.props.onLogoutUser()} />
          <Banner />
          <Switch>
            <Route exact path="/" component={Blog} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            {/*Pages*/}
            <PrivateRoute path="/upload" component={Upload} />
          </Switch>
        </Aux>
      </Router>
    );
  }
}

App.propTypes = {
  onCheckAuthState: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  onCheckAuthState: () => dispatch(checkAuthState()),
  onLogoutUser: () => dispatch(logoutUser())
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
