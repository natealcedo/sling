import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { array, bool, func, shape } from "prop-types";
import { connect } from "react-redux";
import { authenticate, unauthenticate, logout } from "../actions/session"
import Home from "./Home";
import Signup from './Signup';
import Login from "./Login";
import NotFound from "../components/NotFound";
import MatchAuthenticated from "../components/MatchAuthenticated";
import RedirectAuthenticated from "../components/RedirectAuthenticated";
import SideBar from "../components/Sidebar";

class App extends React.PureComponent {
  static propTypes = {
    history: shape({}).isRequired,
    authenticate: func.isRequired,
    unauthenticate: func.isRequired,
    isAuthenticated: bool.isRequired,
    willAuthenticate: bool.isRequired,
    currentUserRooms: array.isRequired,
    logout: func.isRequired,
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      return this.props.authenticate(this.props.history);
    }
    return this.props.unauthenticate()
  }

  handleLogout = history => this.props.logout(history);

  render() {
    const { isAuthenticated, willAuthenticate, history, currentUserRooms } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };
    return (
      <Router history={this.props.history}>
        <div style={{ display: 'flex', flex: 1 }}>
          {
            isAuthenticated &&
            <SideBar
              history={history}
              rooms={currentUserRooms}
              onLogoutClick={this.handleLogout}
            />
          }
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
  willAuthenticate: state.session.willAuthenticate,
  currentUserRooms: state.rooms.currentUserRooms,
}), { authenticate, unauthenticate, logout })(App);