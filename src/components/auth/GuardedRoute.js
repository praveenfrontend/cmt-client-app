import React from "react";
import { Route, Redirect } from "react-router-dom";

function GuardedRoute({ component: Component, auth, userDetails, goalDetails, programDetails, registrationId, ...rest }) {
  return <Route {...rest} render={props => (auth === true ? <Component {...props} userDetails={userDetails} goalDetails={goalDetails} programDetails={programDetails} registrationId={registrationId} /> : <Redirect to="/" />)} />;
}

export default GuardedRoute;
