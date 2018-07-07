import React from "react";
import { Route, Redirect } from "react-router-dom";
import propTypes from "prop-types";

const RedirectAuthenticated = ({
  component: Component,
  path,
  exact,
  isAuthenticated,
  willAuthenticate,
  ...rest
}) => <Route
    exact={exact}
    path={path}
    render={(props) => {
      const newProps = { ...props, ...rest };
      if (isAuthenticated) { return <Redirect to={{ pathname: '/' }} />; }
      if (willAuthenticate) { return null; }
      if (!willAuthenticate && !isAuthenticated) { return <Component {...newProps} />; }
      return null;
    }}
  />

RedirectAuthenticated.propTypes = {
  component: propTypes.func.isRequired,
  path: propTypes.string.isRequired,
  exact: propTypes.bool.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
  willAuthenticate: propTypes.bool.isRequired,
}

export default RedirectAuthenticated;