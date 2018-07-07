import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { func, shape } from "prop-types";
import { connect } from "react-redux";
import { authenticate } from "../actions/session"
import Home from "./Home";
import Signup from './Signup';
import Login from "./Login";
import NotFound from "../components/NotFound";

class App extends React.PureComponent {
  static propTypes = {
    history: shape({}).isRequired,
    authenticate: func.isRequired
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.authenticate()(this.props.history);
    }
  }

  render() {
    return (
      <Router history={this.props.history}>
        <div style={{ display: 'flex', flex: 1 }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default connect(null, { authenticate })(App);