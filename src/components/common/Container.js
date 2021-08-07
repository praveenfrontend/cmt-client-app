import React from "react";
import CardHeader from "./CardHeader";

function Container(props) {
  return (
    <React.Fragment>
      <div className="card my-4">
        <CardHeader cardHeaderValue={props.title} grade={props.grade} upload={props.upload} download={props.download} filename={props.filename} schedule={props.schedule} clickHandler={props.clickHandler} />
        <div className="card-body">{props.children}</div>
      </div>
    </React.Fragment>
  );
}

export default Container;
