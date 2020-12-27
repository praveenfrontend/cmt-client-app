import React from "react";
import { Route, Redirect } from "react-router-dom";

function GuardedRoute({ component: Component, auth, ...rest }) {
  return <Route {...rest} render={props => (auth === true ? <Component {...props} /> : <Redirect to="/" />)} />;
}

export default GuardedRoute;
