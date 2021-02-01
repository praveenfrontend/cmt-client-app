import React from "react";
import { Route, Redirect } from "react-router-dom";

function GuardedRoute({ component: Component, auth, userDetails, ...rest }) {
  return <Route {...rest} render={props => (auth === true ? <Component {...props} userDetails={userDetails} /> : <Redirect to="/" />)} />;
}

export default GuardedRoute;
