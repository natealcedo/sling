import React, { Component } from "react"
import { func } from "prop-types";
import { connect } from 'react-redux';
import { login } from "../../actions/session";
import LoginForm from '../../components/LoginForm';
import Navbar from "../../components/Navbar"

class Login extends Component {
  static propTypes = {
    login: func.isRequired,
  }

  handleLogin = data => this.props.login(data, this.props.history)


  render() {
    return (
      <div style={{ flex: 1 }}>
        <Navbar />
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    )
  }
}

export default connect(null, { login })(Login);