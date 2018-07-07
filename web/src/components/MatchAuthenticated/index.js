import React from "react";
import { Route, Redirect } from "react-router-dom";
import propTypes from "prop-types";

const MatchAuthenticated = ({
  component: Component,
  path,
  exact,
  isAuthenticated,
  willAuthenticate,
}) => <Route
    exact={exact}
    path={path}
    render={(props) => {
      if (isAuthenticated) {
        return <Component {...props} />;
      }
      if (willAuthenticate) {
        return <div />
      }
      if (!willAuthenticate && !isAuthenticated) {
        return <Redirect to={{ pathname: '/login' }} />;
      }
      return null;
    }}
  />

MatchAuthenticated.propTypes = {
  component: propTypes.func.isRequired,
  path: propTypes.string.isRequired,
  exact: propTypes.bool.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  willAuthenticate: propTypes.bool.isRequired,
}

export default MatchAuthenticated;