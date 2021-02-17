import React from "react";
import CardHeader from "./CardHeader";

function Container(props) {
  return (
    <React.Fragment>
      <div className="card my-4">
        <CardHeader cardHeaderValue={props.title} download={props.download} filename={props.filename} />
        <div className="card-body">{props.children}</div>
      </div>
    </React.Fragment>
  );
}

export default Container;
