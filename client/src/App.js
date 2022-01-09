import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { checkAuthState, logoutUser } from "./store/actions/";

import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import Blog from "./containers/Blog/Blog";
import BlogArticle from "./containers/Blog/Items/BlogArticle";
import Register from "./containers/Auth/Register";
import Login from "./containers/Auth/Login";
import Pages from "./containers/Pages/Pages";
import SearchResults from "./components/SearchResults/SearchResults";
import Admin from "./components/Admin/Admin";
import Upload from "./containers/Upload/Upload";
import Footer from "./components/Footer/Footer";
import Aux from "./hoc/AuxWrapperWrapper";
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }
  render() {
    return (
      <Router>
        <Aux>
          <div className="main">
            <Navbar auth={this.props.auth} logout={() => this.props.onLogoutUser()} />
            <Banner />
            <Switch>
              <Route exact path="/" component={Blog} />
              <Route path="/blog/:id" component={BlogArticle} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/pages/:grade/:unit/:part" component={Pages}/>
              <Route path="/searchresults" component={SearchResults} />
              <PrivateRoute path="/upload" component={Upload} />
              <AdminRoute path="/admin" component={Admin} />
            </Switch>
          </div>
          <Footer />
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
