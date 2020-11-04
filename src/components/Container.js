import React, { useState } from "react";
import Sidebar from "./Sidebar";
import CardHeader from "./CardHeader";
import { ProgressBar } from "react-bootstrap";

function Container(props) {
  const [toggled, setToggled] = useState(false);

  function toggleMenu(e) {
    e.preventDefault();
    toggled ? setToggled(false) : setToggled(true);
  }

  return (
    <div className={`d-flex ${toggled ? "toggled" : ""}`} id="wrapper">
      <div className="d-flex">
        <Sidebar />
        <div>
          <button className="navbar-toggler navbar-light bg-primary" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
      <div id="page-content-wrapper" className="mx-auto">
        <div className="container mt-2">
          <br />
          <ProgressBar variant="success" animated now={props.progress} />
          <br />
          {/* <div className="card col-md-12 col-lg-11"> */}
          <div className="card">
            <CardHeader cardHeaderValue={props.title} />
            <div className="card-body">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container;
