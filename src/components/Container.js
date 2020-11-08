import React from "react";
import CardHeader from "./CardHeader";
import { ProgressBar } from "react-bootstrap";

function Container(props) {
  return (
    <React.Fragment>
      {/* <div className="card col-md-12 col-lg-11"> */}
      <div className="card my-4">
        <CardHeader cardHeaderValue={props.title} />
        <div className="card-body">{props.children}</div>
      </div>
    </React.Fragment>
  );
}

export default Container;
