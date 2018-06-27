import React from "react";
import { connect } from "react-redux";
import { func } from 'prop-types'
import { signup } from "../../actions/session";
import SignupForm from '../../components/SignupForm';
import Navbar from '../../components/Navbar';

const Signup = props => (
  <div style={{ flex: 1 }}>
    <Navbar />
    <SignupForm onSubmit={props.signup} />
  </div>
)

Signup.propTypes = {
  signup: func.isRequired
}

export default connect(null, { signup })(Signup);