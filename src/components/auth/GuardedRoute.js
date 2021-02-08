import React from "react";
import { Route, Redirect } from "react-router-dom";

function GuardedRoute({ component: Component, auth, userDetails, goalDetails, childDetails, programDetails, healthDetails, registrationId, ...rest }) {
  return <Route {...rest} render={props => (auth === true ? <Component {...props} userDetails={userDetails} goalDetails={goalDetails} childDetails={childDetails} programDetails={programDetails} registrationId={registrationId} healthDetails={healthDetails} /> : <Redirect to="/" />)} />;
}

export default GuardedRoute;
