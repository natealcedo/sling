import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { bool, func, shape } from "prop-types";
import { connect } from "react-redux";
import { authenticate, unauthenticate } from "../actions/session"
import Home from "./Home";
import Signup from './Signup';
import Login from "./Login";
import NotFound from "../components/NotFound";
import MatchAuthenticated from "../components/MatchAuthenticated";
import RedirectAuthenticated from "../components/RedirectAuthenticated";

class App extends React.PureComponent {
  static propTypes = {
    history: shape({}).isRequired,
    authenticate: func.isRequired,
    unauthenticate: func.isRequired,
    isAuthenticated: bool.isRequired,
    willAuthenticate: bool.isRequired,
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      return this.props.authenticate()(this.props.history);
    }
    return this.props.unauthenticate()
  }

  render() {
    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };
    return (
      <Router history={this.props.history}>
        <div style={{ display: 'flex', flex: 1 }}>
          <Switch>
            <MatchAuthenticated exact path="/" component={Home} {...authProps} />
            <RedirectAuthenticated exact path="/signup" component={Signup} {...authProps} />
            <RedirectAuthenticated exact path="/login" component={Login} {...authProps} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default connect(state => ({
  isAuthenticated: state.session.isAuthenticated,
  currentUser: state.session.currentUser,
  willAuthenticate: state.session.willAuthenticate
}), { authenticate, unauthenticate })(App);